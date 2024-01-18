package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Opinion holds the schema definition for the Opinion entity.
type Opinions struct {
	ent.Schema
}

// Fields of the Opinion.
func (Opinions) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("name"),
		field.String("telephone"),
		field.Time("time"),
		field.String("brand"),
		field.String("resturtant"),
		field.String("outlook1"),
		field.String("outlook2"),
		field.String("outlook3"),
		field.String("waiting1"),
		field.String("waiting2"),
		field.String("ordering1"),
		field.String("ordering2"),
		field.String("ordering3"),
		field.String("service1"),
		field.String("service2"),
		field.String("service3"),
		field.String("qunility1"),
		field.String("qunility2"),
		field.String("qunility3"),
		field.String("value1"),
		field.String("value2"),
		field.String("comment"),
		field.Int("rating"),
		field.Time("createdat"),
	}
}

// Edges of the Opinion.
func (Opinions) Edges() []ent.Edge {
	return nil
}
