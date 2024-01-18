package api_auth

import (
	"erm/internal/middleware"

	"github.com/gofiber/fiber/v2"
)

var Router fiber.Router

func NewRouterHandler(aa *ApiAuth, r fiber.Router) {
	Router := r.Group("/auth")

	UserRouter := Router.Group("/user")

	UserRouter.Post("/sign/up", func(c *fiber.Ctx) error {
		return aa.UserSignUp(c)
	})

	TokenRouter := Router.Group("/token")

	TokenRouter.Post("/get", func(c *fiber.Ctx) error {
		return aa.GetToken(c)
	})

	TokenRouter.Post("/clear", middleware.JWTProtected(), func(c *fiber.Ctx) error {
		return aa.ClearToken(c)
	})

	TokenRouter.Post("/renew", middleware.JWTProtected(), func(c *fiber.Ctx) error {
		return aa.RenewTokens(c)
	})
}
