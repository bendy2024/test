package api_auth

import (
	"context"
	"erm/internal/db/ent"
	"erm/internal/db/ent/users"

	"github.com/google/uuid"
)

// GetUserByID query for getting one User by given ID.
func (aa *ApiAuth) GetUserByID(Id uuid.UUID, Ctx context.Context) (*ent.Users, error) {
	// Define User variable.
	user, err := aa.cfg.Client.Users.Query().
		Where(users.ID(Id)).
		Only(Ctx)

	// Return query result.
	return user, err
}

// GetUserByEmail query for getting one User by given Email.
func (aa *ApiAuth) GetUserByEmail(Email string, Ctx context.Context) (*ent.Users, error) {
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
func (aa *ApiAuth) CreateUser(User *ent.Users, Ctx context.Context) (*ent.Users, error) {
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
