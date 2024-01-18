// Code generated by ent, DO NOT EDIT.

package users

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the users type in the database.
	Label = "users"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldEmail holds the string denoting the email field in the database.
	FieldEmail = "email"
	// FieldPasswordHash holds the string denoting the password_hash field in the database.
	FieldPasswordHash = "password_hash"
	// FieldUserStatus holds the string denoting the user_status field in the database.
	FieldUserStatus = "user_status"
	// FieldUserRole holds the string denoting the user_role field in the database.
	FieldUserRole = "user_role"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// Table holds the table name of the users in the database.
	Table = "users"
)

// Columns holds all SQL columns for users fields.
var Columns = []string{
	FieldID,
	FieldEmail,
	FieldPasswordHash,
	FieldUserStatus,
	FieldUserRole,
	FieldUpdatedAt,
	FieldCreatedAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// PasswordHashValidator is a validator for the "password_hash" field. It is called by the builders before save.
	PasswordHashValidator func(string) error
	// DefaultUserStatus holds the default value on creation for the "user_status" field.
	DefaultUserStatus int
	// UserStatusValidator is a validator for the "user_status" field. It is called by the builders before save.
	UserStatusValidator func(int) error
	// DefaultUserRole holds the default value on creation for the "user_role" field.
	DefaultUserRole string
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// OrderOption defines the ordering options for the Users queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByEmail orders the results by the email field.
func ByEmail(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldEmail, opts...).ToFunc()
}

// ByPasswordHash orders the results by the password_hash field.
func ByPasswordHash(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldPasswordHash, opts...).ToFunc()
}

// ByUserStatus orders the results by the user_status field.
func ByUserStatus(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUserStatus, opts...).ToFunc()
}

// ByUserRole orders the results by the user_role field.
func ByUserRole(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUserRole, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}