package mystery

import (
	"github.com/gofiber/fiber/v2"
)

var Router fiber.Router

func NewRouterHandler(aa *Mystery, r fiber.Router) {
	Router := r.Group("/mystery")

	CreateRouter := Router.Group("/opinion")

	CreateRouter.Post("/new", func(c *fiber.Ctx) error {
		return aa.createOpinion(c)
	})
	CreateRouter.Post("/login", func(c *fiber.Ctx) error {
		return aa.loginCtrl(c)
	})
	CreateRouter.Post("/send-opinion", func(c *fiber.Ctx) error {
		return aa.sendCtrl(c)
	})
	CreateRouter.Post("/upload", func(c *fiber.Ctx) error {
		return aa.uploadCtrl(c)
	})
	CreateRouter.Get("/all", func(c *fiber.Ctx) error {
		return aa.getAllCtrl(c)
	})
	CreateRouter.Post("/get-record", func(c *fiber.Ctx) error {
		return aa.getRecordCtrl(c)
	})
}
