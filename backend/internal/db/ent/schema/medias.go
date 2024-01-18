package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Media holds the schema definition for the Media entity.
type Medias struct {
	ent.Schema
}

// Fields of the Media.
func (Medias) Fields() []ent.Field {
	return []ent.Field{
		field.String("oid"),
		field.String("path"),
	}
}

// Edges of the Media.
func (Medias) Edges() []ent.Edge {
	return nil
}
