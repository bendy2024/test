// Code generated by ent, DO NOT EDIT.

package medias

import (
	"erm/internal/db/ent/predicate"

	"entgo.io/ent/dialect/sql"
)

// ID filters vertices based on their ID field.
func ID(id int) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Medias {
	return predicate.Medias(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Medias {
	return predicate.Medias(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.Medias {
	return predicate.Medias(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.Medias {
	return predicate.Medias(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Medias {
	return predicate.Medias(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Medias {
	return predicate.Medias(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Medias {
	return predicate.Medias(sql.FieldLTE(FieldID, id))
}

// Oid applies equality check predicate on the "oid" field. It's identical to OidEQ.
func Oid(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldOid, v))
}

// Path applies equality check predicate on the "path" field. It's identical to PathEQ.
func Path(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldPath, v))
}

// OidEQ applies the EQ predicate on the "oid" field.
func OidEQ(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldOid, v))
}

// OidNEQ applies the NEQ predicate on the "oid" field.
func OidNEQ(v string) predicate.Medias {
	return predicate.Medias(sql.FieldNEQ(FieldOid, v))
}

// OidIn applies the In predicate on the "oid" field.
func OidIn(vs ...string) predicate.Medias {
	return predicate.Medias(sql.FieldIn(FieldOid, vs...))
}

// OidNotIn applies the NotIn predicate on the "oid" field.
func OidNotIn(vs ...string) predicate.Medias {
	return predicate.Medias(sql.FieldNotIn(FieldOid, vs...))
}

// OidGT applies the GT predicate on the "oid" field.
func OidGT(v string) predicate.Medias {
	return predicate.Medias(sql.FieldGT(FieldOid, v))
}

// OidGTE applies the GTE predicate on the "oid" field.
func OidGTE(v string) predicate.Medias {
	return predicate.Medias(sql.FieldGTE(FieldOid, v))
}

// OidLT applies the LT predicate on the "oid" field.
func OidLT(v string) predicate.Medias {
	return predicate.Medias(sql.FieldLT(FieldOid, v))
}

// OidLTE applies the LTE predicate on the "oid" field.
func OidLTE(v string) predicate.Medias {
	return predicate.Medias(sql.FieldLTE(FieldOid, v))
}

// OidContains applies the Contains predicate on the "oid" field.
func OidContains(v string) predicate.Medias {
	return predicate.Medias(sql.FieldContains(FieldOid, v))
}

// OidHasPrefix applies the HasPrefix predicate on the "oid" field.
func OidHasPrefix(v string) predicate.Medias {
	return predicate.Medias(sql.FieldHasPrefix(FieldOid, v))
}

// OidHasSuffix applies the HasSuffix predicate on the "oid" field.
func OidHasSuffix(v string) predicate.Medias {
	return predicate.Medias(sql.FieldHasSuffix(FieldOid, v))
}

// OidEqualFold applies the EqualFold predicate on the "oid" field.
func OidEqualFold(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEqualFold(FieldOid, v))
}

// OidContainsFold applies the ContainsFold predicate on the "oid" field.
func OidContainsFold(v string) predicate.Medias {
	return predicate.Medias(sql.FieldContainsFold(FieldOid, v))
}

// PathEQ applies the EQ predicate on the "path" field.
func PathEQ(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEQ(FieldPath, v))
}

// PathNEQ applies the NEQ predicate on the "path" field.
func PathNEQ(v string) predicate.Medias {
	return predicate.Medias(sql.FieldNEQ(FieldPath, v))
}

// PathIn applies the In predicate on the "path" field.
func PathIn(vs ...string) predicate.Medias {
	return predicate.Medias(sql.FieldIn(FieldPath, vs...))
}

// PathNotIn applies the NotIn predicate on the "path" field.
func PathNotIn(vs ...string) predicate.Medias {
	return predicate.Medias(sql.FieldNotIn(FieldPath, vs...))
}

// PathGT applies the GT predicate on the "path" field.
func PathGT(v string) predicate.Medias {
	return predicate.Medias(sql.FieldGT(FieldPath, v))
}

// PathGTE applies the GTE predicate on the "path" field.
func PathGTE(v string) predicate.Medias {
	return predicate.Medias(sql.FieldGTE(FieldPath, v))
}

// PathLT applies the LT predicate on the "path" field.
func PathLT(v string) predicate.Medias {
	return predicate.Medias(sql.FieldLT(FieldPath, v))
}

// PathLTE applies the LTE predicate on the "path" field.
func PathLTE(v string) predicate.Medias {
	return predicate.Medias(sql.FieldLTE(FieldPath, v))
}

// PathContains applies the Contains predicate on the "path" field.
func PathContains(v string) predicate.Medias {
	return predicate.Medias(sql.FieldContains(FieldPath, v))
}

// PathHasPrefix applies the HasPrefix predicate on the "path" field.
func PathHasPrefix(v string) predicate.Medias {
	return predicate.Medias(sql.FieldHasPrefix(FieldPath, v))
}

// PathHasSuffix applies the HasSuffix predicate on the "path" field.
func PathHasSuffix(v string) predicate.Medias {
	return predicate.Medias(sql.FieldHasSuffix(FieldPath, v))
}

// PathEqualFold applies the EqualFold predicate on the "path" field.
func PathEqualFold(v string) predicate.Medias {
	return predicate.Medias(sql.FieldEqualFold(FieldPath, v))
}

// PathContainsFold applies the ContainsFold predicate on the "path" field.
func PathContainsFold(v string) predicate.Medias {
	return predicate.Medias(sql.FieldContainsFold(FieldPath, v))
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Medias) predicate.Medias {
	return predicate.Medias(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Medias) predicate.Medias {
	return predicate.Medias(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Medias) predicate.Medias {
	return predicate.Medias(func(s *sql.Selector) {
		p(s.Not())
	})
}