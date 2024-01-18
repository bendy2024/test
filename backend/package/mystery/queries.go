package mystery

import (
	"context"
	"erm/internal/db/ent"
	"erm/internal/db/ent/medias"
	"erm/internal/db/ent/opinions"
	"erm/internal/db/ent/userlogins"
	"erm/internal/db/ent/users"
	"fmt"
	"mime/multipart"
	"reflect"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
)

// GetUserByID query for getting one User by given ID.
func (aa *Mystery) GetUserByID(Id uuid.UUID, Ctx context.Context) (*ent.Users, error) {
	// Define User variable.
	user, err := aa.cfg.Client.Users.Query().
		Where(users.ID(Id)).
		Only(Ctx)

	// Return query result.
	return user, err
}

// GetUserByEmail query for getting one User by given Email.
func (aa *Mystery) GetUserByEmail(Email string, Ctx context.Context) (*ent.Users, error) {
	// Define User variable.
	/*
		rows, err := db.SqlDb.QueryContext(Ctx, "select * from users where email = ?", Email)

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()
		myusers := []ent.Users{}

		for rows.Next() {
			myuser := ent.Users{}
			if err := rows.Scan(&myuser.ID, &myuser.Email, &myuser.PasswordHash, &myuser.UserStatus, &myuser.UserRole, &myuser.UpdatedAt, &myuser.CreatedAt); err != nil {
				// Check for a scan error.
				// Query rows will be closed with defer.
				log.Fatal(err)
			}
			myusers = append(myusers, myuser)
		}
	*/
	user, err := aa.cfg.Client.Users.Query().
		Where(users.Email(Email)).
		Only(Ctx)

	// Return query result.
	return user, err
}

// CreateUser query for creating a new user by given email and password hash.
func (aa *Mystery) CreateUser(User *ent.Users, Ctx context.Context) (*ent.Users, error) {
	User, err := aa.cfg.Client.Users.Create().
		SetEmail(User.Email).
		SetPasswordHash(User.PasswordHash).
		SetUserStatus(User.UserStatus).
		SetUserRole(User.UserRole).
		SetUpdatedAt(User.UpdatedAt).
		SetCreatedAt(User.CreatedAt).
		Save(Ctx)

	if err != nil {
		return nil, err
	}

	return User, err
}

func (aa *Mystery) CheckUserLogin(username, password string, Ctx context.Context) (bool, error) {
	_, err := aa.cfg.Client.Userlogins.Query().Where(userlogins.Username(username), userlogins.Password(password)).Only(Ctx)

	var status bool = false

	if err != nil {
		return false, err
	}

	status = true
	return status, err
}

func (aa *Mystery) NewOpinion(id, name, tel string, datetime time.Time, brand, resturtant, outlook1, outlook2, outlook3, waiting1, waiting2, ordering1, ordering2, ordering3, service1, service2, service3, qunility1, qunility2, qunility3, value1, value2, comment string, rating int16, Ctx context.Context) (bool, error) {

	var status bool = false
	_, err := aa.cfg.Client.Opinions.Create().
		SetID(id).
		SetName(name).
		SetTelephone(tel).
		SetTime(datetime).
		SetBrand(brand).
		SetResturtant(resturtant).
		SetOutlook1(outlook1).
		SetOutlook2(outlook2).
		SetOutlook3(outlook3).
		SetWaiting1(waiting1).
		SetWaiting2(waiting2).
		SetOrdering1(ordering1).
		SetOrdering2(ordering2).
		SetOrdering3(ordering3).
		SetService1(service1).
		SetService2(service2).
		SetService3(service3).
		SetQunility1(qunility1).
		SetQunility2(qunility2).
		SetQunility3(qunility3).
		SetValue1(value1).
		SetValue2(value2).
		SetComment(comment).
		SetRating(int(rating)).
		SetCreatedat(time.Now()).
		Save(Ctx)

	if err != nil {
		return false, err
	}
	status = true
	// fmt.Println(new)
	return status, err
}

func HandleFileUpload(file *multipart.FileHeader) (string, error) {
	uuid := uuid.New().String()

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-southeast-1"),
	})

	if err != nil {
		fmt.Println("Failed to connect AWS session:", err)
	}

	bucketName := "mystery-file"
	filePath := "media/" + uuid + file.Filename
	// fmt.Println(filePath)

	fileContent, _ := file.Open()
	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filePath),
		Body:   fileContent,
		ACL:    aws.String("public-read"),
	})

	if err != nil {
		return "Fail to upload to S3: ", err
	}

	return filePath, err
}

func (aa *Mystery) uploadMedia(id, path string, Ctx context.Context) error {
	_, err := aa.cfg.Client.Medias.Create().
		SetOid(id).
		SetPath(path).
		Save(Ctx)
	return err
}

func (aa *Mystery) GetAllData(Ctx context.Context) []*ent.Opinions {
	// var data []opinion
	data, err := aa.cfg.Client.Opinions.Query().Order(opinions.ByTime(sql.OrderDesc())).All(Ctx)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Print(reflect.TypeOf(data))
	return data
}

func (aa *Mystery) GetOpinionData(id string, Ctx context.Context) any {
	op, err := aa.cfg.Client.Opinions.Query().Where(opinions.ID(id)).Only(Ctx)
	if err != nil {
		return err
	}
	// fmt.Println(mda)
	return op
}

func (aa *Mystery) GetMediaData(id string, Ctx context.Context) any {

	mda, err := aa.cfg.Client.Medias.Query().Where(medias.Oid(id)).All(Ctx)
	if err != nil {
		return err
	}
	// fmt.Println(mda)
	return mda
}
