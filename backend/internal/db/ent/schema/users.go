package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// Users holds the schema definition for the Users entity.
type Users struct {
	ent.Schema
}

func (Users) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).Unique().Immutable(),
		field.String("email"),
		field.String("password_hash").
			NotEmpty(),
		field.Int("user_status").
			Positive().Default(0),
		field.String("user_role").
			Default("admin"),
		field.Time("updated_at").
			Default(time.Now),
		field.Time("created_at").
			Default(time.Now),
	}
}

func (Users) Indexes() []ent.Index {
	return []ent.Index{
		// unique index.
		index.Fields("email").
			Unique(),
	}
}

// Edges of the User.
func (Users) Edges() []ent.Edge {
	return nil
}
