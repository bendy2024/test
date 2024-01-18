package cache

import (
	"os"
)

type RedisConfig struct {
	HostName string `env:"REDIS_HOSTNAME"`
	Password string `env:"REDIS_PASSWORD"`
	Port     string `env:"REDIS_PORT"`
	DbNumber string `env:"REDIS_DB_NUMBER"`
}

func NewRedisConfig() *RedisConfig {
	cfg := &RedisConfig{
		HostName: os.Getenv("REDIS_HOST"),
		Password: os.Getenv("REDIS_PASSWORD"),
		Port:     os.Getenv("REDIS_PORT"),
		DbNumber: os.Getenv("REDIS_DB_NUMBER"),
	}

	//log.Printf("+%v", cfg)
	return cfg
}
