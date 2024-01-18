package db

import (
	"log"
	"time"

	"database/sql"

	"erm/internal/db/ent"
	"erm/internal/utils"

	"entgo.io/ent/dialect"

	entsql "entgo.io/ent/dialect/sql"

	_ "github.com/go-sql-driver/mysql"
)

// MysqlConnection func for connection to Mysql database.
func Connect(cfg *DBConfig) (*ent.Client, *sql.DB) {
	// Build Mysql connection URL.
	mysqlConnURL, err := utils.ConnectionURLBuilder("mysql")
	if err != nil {
		log.Fatal("Error cannot get connect path: ", err)
	}

	// Define database connection for Mysql.
	db, err := sql.Open("mysql", mysqlConnURL)
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}

	// Set database connection settings:
	// 	- SetMaxOpenConns: the default is 0 (unlimited)
	// 	- SetMaxIdleConns: defaultMaxIdleConns = 2
	// 	- SetConnMaxLifetime: 0, connections are reused forever
	db.SetMaxOpenConns(cfg.MaxConnections)
	db.SetMaxIdleConns(cfg.MaxIdleConnections)
	db.SetConnMaxLifetime(time.Duration(cfg.MaxLifeTimeConnections))

	// Try to ping database.
	if err := db.Ping(); err != nil {
		defer db.Close() // close database connection
		log.Fatal("Error connecting test fail: ", err)
	}

	drv := entsql.OpenDB(dialect.MySQL, db)
	return ent.NewClient(ent.Driver(drv)), db
}
