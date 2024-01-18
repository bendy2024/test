package mystery

import (
	"context"
	"erm/internal/db/ent"
	"erm/internal/utils"
	"time"

	"github.com/gofiber/fiber/v2"
)

func (aa *Mystery) createOpinion(c *fiber.Ctx) error {
	// Parse the request
	signUp := &SignUp{}

	if err := c.BodyParser(signUp); err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	validate := utils.NewValidator()

	// Validate sign up fields.
	if err := validate.Struct(signUp); err != nil {
		// Return, if some fields are not valid.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   utils.ValidatorErrors(err),
		})
	}

	// Checking role from sign up data.
	role, err := utils.VerifyRole(signUp.UserRole)
	if err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	user := &ent.Users{
		Email:        signUp.Email,
		PasswordHash: utils.GeneratePassword(signUp.Password),
		UserStatus:   1,
		UserRole:     role,
		CreatedAt:    time.Now(),
	}
	user.UpdatedAt = user.CreatedAt

	// Validate user fields.
	if err := validate.Struct(user); err != nil {
		// Return, if some fields are not valid.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   utils.ValidatorErrors(err),
		})
	}

	// Create a new user with validated data.
	if _, err := aa.CreateUser(user, c.UserContext()); err != nil {
		// Return status 500 and create user process error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Delete password hash field from JSON view.
	user.PasswordHash = signUp.Password

	// Return status 200 OK.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   nil,
		"user":  user,
	})
}

func (aa *Mystery) GetToken(c *fiber.Ctx) error {
	// Create a new user auth struct.
	signIn := &SignIn{}

	// Checking received data from JSON body.
	if err := c.BodyParser(signIn); err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Get user by email.
	foundedUser, err := aa.GetUserByEmail(signIn.Email, c.UserContext())
	if err != nil {
		// Return, if user not found.
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "user with the given email is not found",
		})
	}

	// Compare given user password with stored in found user.
	compareUserPassword := utils.ComparePasswords(foundedUser.PasswordHash, signIn.Password)
	if !compareUserPassword {
		// Return, if password is not compare to stored in database.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "wrong user email address or password",
		})
	}

	// Get role credentials from founded user.
	credentials, err := utils.GetCredentialsByRole(foundedUser.UserRole)
	if err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Generate a new pair of access and refresh tokens.
	tokens, err := utils.GenerateNewTokens(foundedUser.ID.String(), credentials)
	if err != nil {
		// Return status 500 and token generation error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Define user ID.
	userID := foundedUser.ID.String()

	// Save refresh token to Redis.
	errSaveToRedis := aa.cfg.Redis.Set(context.Background(), userID, tokens.Refresh, 0).Err()
	if errSaveToRedis != nil {
		// Return status 500 and Redis connection error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   errSaveToRedis.Error(),
		})
	}

	// Return status 200 OK.
	return c.JSON(fiber.Map{
		"error": false,
		"msg":   nil,
		"tokens": fiber.Map{
			"access":  tokens.Access,
			"refresh": tokens.Refresh,
		},
	})
}

func (aa *Mystery) ClearToken(c *fiber.Ctx) error {
	// Get claims from JWT.
	claims, err := utils.ExtractTokenMetadata(c)
	if err != nil {
		// Return status 500 and JWT parse error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Define user ID.
	userID := claims.UserID.String()

	// Save refresh token to Redis.
	errDelFromRedis := aa.cfg.Redis.Del(context.Background(), userID).Err()
	if errDelFromRedis != nil {
		// Return status 500 and Redis deletion error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   errDelFromRedis.Error(),
		})
	}

	// Return status 204 no content.
	return c.SendStatus(fiber.StatusNoContent)
}

func (aa *Mystery) RenewTokens(c *fiber.Ctx) error {
	// Get now time.
	now := time.Now().Unix()

	// Get claims from JWT.
	claims, err := utils.ExtractTokenMetadata(c)
	if err != nil {
		// Return status 500 and JWT parse error.
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Set expiration time from JWT data of current user.
	expiresAccessToken := claims.Expires

	// Checking, if now time greather than Access token expiration time.
	if now > expiresAccessToken {
		// Return status 401 and unauthorized error message.
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "unauthorized, check expiration time of your token",
		})
	}

	// Create a new renew refresh token struct.
	renew := &Renew{}

	// Checking received data from JSON body.
	if err := c.BodyParser(renew); err != nil {
		// Return, if JSON data is not correct.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Set expiration time from Refresh token of current user.
	expiresRefreshToken, err := utils.ParseRefreshToken(renew.RefreshToken)
	if err != nil {
		// Return status 400 and error message.
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	// Checking, if now time greather than Refresh token expiration time.
	if now < expiresRefreshToken {
		// Define user ID.
		userID := claims.UserID

		// Get user by ID.
		foundedUser, err := aa.GetUserByID(userID, c.Context())
		if err != nil {
			// Return, if user not found.
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": true,
				"msg":   "user with the given ID is not found",
			})
		}

		// Get role credentials from founded user.
		credentials, err := utils.GetCredentialsByRole(foundedUser.UserRole)
		if err != nil {
			// Return status 400 and error message.
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}

		// Generate JWT Access & Refresh tokens.
		tokens, err := utils.GenerateNewTokens(userID.String(), credentials)
		if err != nil {
			// Return status 500 and token generation error.
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}

		// Save refresh token to Redis.
		errRedis := aa.cfg.Redis.Set(context.Background(), userID.String(), tokens.Refresh, 0).Err()
		if errRedis != nil {
			// Return status 500 and Redis connection error.
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": true,
				"msg":   errRedis.Error(),
			})
		}

		return c.JSON(fiber.Map{
			"error": false,
			"msg":   nil,
			"tokens": fiber.Map{
				"access":  tokens.Access,
				"refresh": tokens.Refresh,
			},
		})
	} else {
		// Return status 401 and unauthorized error message.
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "unauthorized, your session was ended earlier",
		})
	}
}

type login struct {
	Username string `json:"username" xml:"username" form:"username"`
	Password string `json:"password" xml:"password" form:"password"`
}

func (aa *Mystery) loginCtrl(c *fiber.Ctx) error {
	req := &login{}
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid Data",
		})
	}
	// status, err := SaveWorkers(s.cfg.RdsConn, req.Name, req.Tel, req.No, jwt.GetUserUid(c), req.Id, req.Status, false)
	status, err := aa.CheckUserLogin(req.Username, req.Password, c.Context())
	// fmt.Print(status)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "登入名稱或密碼錯誤",
		})

	}
	return c.JSON(fiber.Map{"error": "false", "Login": status})
}

type opinion struct {
	Id         string    `json:"id" xml:"id" form:"id"`
	Name       string    `json:"name" xml:"name" form:"name"`
	Tel        string    `json:"tel" xml:"tel" form:"tel"`
	Time       time.Time `json:"time" xml:"time" form:"time"`
	Brand      string    `json:"brand" xml:"brand" form:"brand"`
	Resturtant string    `json:"resturtant" xml:"resturtant" form:"resturtant"`
	Outlook1   string    `json:"outlook1" xml:"outlook1" form:"outlook1"`
	Outlook2   string    `json:"outlook2" xml:"outlook2" form:"outlook2"`
	Outlook3   string    `json:"outlook3" xml:"outlook3" form:"outlook3"`
	Waiting1   string    `json:"waiting1" xml:"waiting1" form:"waiting1"`
	Waiting2   string    `json:"waiting2" xml:"waiting2" form:"waiting2"`
	Ordering1  string    `json:"ordering1" xml:"ordering1" form:"ordering1"`
	Ordering2  string    `json:"ordering2" xml:"ordering2" form:"ordering2"`
	Ordering3  string    `json:"ordering3" xml:"ordering3" form:"ordering3"`
	Service1   string    `json:"service1" xml:"service1" form:"service1"`
	Service2   string    `json:"service2" xml:"service2" form:"service2"`
	Service3   string    `json:"service3" xml:"service3" form:"service3"`
	Qunility1  string    `json:"qunility1" xml:"qunility1" form:"qunility1"`
	Qunility2  string    `json:"qunility2" xml:"qunility2" form:"qunility2"`
	Qunility3  string    `json:"qunility3" xml:"qunility3" form:"qunility3"`
	Value1     string    `json:"value1" xml:"value1" form:"value1"`
	Value2     string    `json:"value2" xml:"value2" form:"value2"`
	Comment    string    `json:"comment" xml:"comment" form:"comment"`
	Rating     int16     `json:"rating" xml:"rating" form:"rating"`
	Media      []string  `json:"media" xml:"media" form:"media"`
}

func (aa *Mystery) sendCtrl(c *fiber.Ctx) error {
	req := &opinion{}
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid Data",
		})
	}
	// fmt.Println(reflect.TypeOf(req.Tel))
	// fmt.Println(req.Media)
	status, err := aa.NewOpinion(req.Id, req.Name, req.Tel, req.Time, req.Brand, req.Resturtant, req.Outlook1, req.Outlook2, req.Outlook3, req.Waiting1, req.Waiting2, req.Ordering1, req.Ordering2, req.Ordering3, req.Service1, req.Service2, req.Service3, req.Qunility1, req.Qunility2, req.Qunility3, req.Value1, req.Value2, req.Comment, req.Rating, c.Context())

	if len(req.Media) != 0 {
		for _, value := range req.Media {
			err := aa.uploadMedia(req.Id, value, c.Context())
			if err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"error": true,
					"msg":   err,
				})
			}
		}
	}

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": true,
			"msg":   "Insert Error",
		})
	}
	// fmt.Print("statue:", status)
	return c.JSON(fiber.Map{"error": "false", "Create": status})
}

func (aa *Mystery) uploadCtrl(c *fiber.Ctx) error {
	var filePaths []string
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON((fiber.Map{
			"error": true,
			"msg":   "Upload Error",
		}))
	}
	files := form.File["file"]
	for _, file := range files {
		name, err := HandleFileUpload(file)
		if err != nil {
			return err
		}
		// fmt.Println(name)
		filePaths = append(filePaths, name)
	}

	return c.JSON(fiber.Map{"error": "false", "file": filePaths})
}

func (aa *Mystery) getAllCtrl(c *fiber.Ctx) error {
	data := aa.GetAllData(c.Context())
	return c.JSON(fiber.Map{"error": "false", "data": data})
}

type record struct {
	Recordid string `json:"recordid" xml:"recordid" form:"recordid"`
}

func (aa *Mystery) getRecordCtrl(c *fiber.Ctx) error {
	req := &record{}
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid Data",
		})
	}
	op := aa.GetOpinionData(req.Recordid, c.Context())
	mda := aa.GetMediaData(req.Recordid, c.Context())

	return c.JSON(fiber.Map{"error": "false", "opinion": op, "media": mda})
}
