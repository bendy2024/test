package cache

import (
	"erm/internal/utils"
	"log"
	"os"
	"strconv"

	"github.com/go-redis/redis/v8"
)

// RedisConnection func for connect to Redis server.
func RedisConnection(cfg *RedisConfig) *redis.Client {
	// Define Redis database number.
	dbNumber, _ := strconv.Atoi(os.Getenv("REDIS_DB_NUMBER"))

	// Build Redis connection URL.
	redisConnURL, err := utils.ConnectionURLBuilder("redis")
	if err != nil {
		log.Fatal("Error connecting to redis: ", err)
	}

	// Set Redis options.
	options := &redis.Options{
		Addr:     redisConnURL,
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       dbNumber,
	}

	return redis.NewClient(options)
}
