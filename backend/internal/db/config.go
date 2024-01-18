package db

import (
	"os"
	"strconv"
)

type DBConfig struct {
	HostName               string `env:"MYSQL_HOSTNAME"`
	UserName               string `env:"MYSQL_USERNAME"`
	Password               string `env:"MYSQL_PASSWORD"`
	Port                   string `env:"MYSQL_PORT"`
	Database               string `env:"MYSQL_DATABASE_NAME"`
	SSLMode                string `env:"MYSQL_DATABASE_NAME"`
	MaxConnections         int    `env:"MYSQL_MAX_CONNECTIONS"`
	MaxIdleConnections     int    `env:"MYSQL_MAX_IDLE_CONNECTIONS"`
	MaxLifeTimeConnections int    `env:"MYSQL_MAX,LIFE_TIME_CONNECTIONS"`
}

func NewMysqlConfig() *DBConfig {
	cfg := &DBConfig{
		HostName: os.Getenv("DB_HOST"),
		UserName: os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Port:     os.Getenv("DB_PORT"),
		Database: os.Getenv("DB_NAME"),
		SSLMode:  os.Getenv("DB_SSL_MODE"),
	}

	cfg.MaxConnections, _ = strconv.Atoi(os.Getenv("DB_MAX_CONNECTIONS"))
	cfg.MaxIdleConnections, _ = strconv.Atoi(os.Getenv("DB_MAX_IDLE_CONNECTIONS"))
	cfg.MaxLifeTimeConnections, _ = strconv.Atoi(os.Getenv("DB_MAX_LIFETIME_CONNECTIONS"))

	//log.Printf("+%v", cfg)
	return cfg
}
