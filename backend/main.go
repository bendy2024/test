package main

import (
	"erm/internal/db"
	"erm/internal/utils"
	"erm/package/api_auth"
	"erm/package/mystery"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := fiber.New(fiber.Config{
		BodyLimit: 1024 * 1024 * 1024,
	})

	// Middleware
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	// Init Config
	dbConfig := db.NewMysqlConfig()
	// Setup DB Connection
	entConn, sqlConn := db.Connect(dbConfig)

	// Init Config
	//redisConfig := cache.NewRedisConfig()
	// Setup Redis Connection
	//connRedis := cache.RedisConnection(redisConfig)

	// Module Config
	//userQuoteCfg := users.NewConfig(entConn, sqlConn)
	apiAuthQuoteCfg := api_auth.NewConfig(entConn, sqlConn)
	mysteryCfg := mystery.NewConfig(entConn, sqlConn)
	//PoCfg := purchase_order.NewConfig(conn)

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Add route
	api_auth.NewRouterHandler(api_auth.NewApiAuth(*apiAuthQuoteCfg), v1)
	mystery.NewRouterHandler(mystery.NewMystery(*mysteryCfg), v1)

	//app.Listen(":3000")
	if os.Getenv("STAGE_STATUS") == "dev" {
		utils.StartServer(app)
	} else {
		utils.StartServerWithGracefulShutdown(app)
	}
}
