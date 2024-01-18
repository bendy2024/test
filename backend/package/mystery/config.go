package mystery

import (
	"database/sql"
	"erm/internal/db/ent"

	"github.com/go-redis/redis/v8"
)

type Config struct {
	Client *ent.Client
	SqlDb  *sql.DB
	Redis  *redis.Client
}

// func NewConfig(client *ent.Client, db *sql.DB, redis *redis.Client) *Config {
func NewConfig(client *ent.Client, db *sql.DB) *Config {
	cfg := &Config{
		Client: client,
		SqlDb:  db,
		//Redis:  redis,
	}
	return cfg
}
