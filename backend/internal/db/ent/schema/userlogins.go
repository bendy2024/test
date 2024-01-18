package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Userlogins holds the schema definition for the Userlogins entity.
type Userlogins struct {
	ent.Schema
}

// Fields of the Userlogins.
func (Userlogins) Fields() []ent.Field {
	return []ent.Field{
		field.String("username"),
		field.String("password"),
	}
}

// Edges of the Userlogins.
func (Userlogins) Edges() []ent.Edge {
	return nil
}
