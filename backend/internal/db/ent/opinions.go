// Code generated by ent, DO NOT EDIT.

package ent

import (
	"erm/internal/db/ent/opinions"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Opinions is the model entity for the Opinions schema.
type Opinions struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Telephone holds the value of the "telephone" field.
	Telephone string `json:"telephone,omitempty"`
	// Time holds the value of the "time" field.
	Time time.Time `json:"time,omitempty"`
	// Brand holds the value of the "brand" field.
	Brand string `json:"brand,omitempty"`
	// Resturtant holds the value of the "resturtant" field.
	Resturtant string `json:"resturtant,omitempty"`
	// Outlook1 holds the value of the "outlook1" field.
	Outlook1 string `json:"outlook1,omitempty"`
	// Outlook2 holds the value of the "outlook2" field.
	Outlook2 string `json:"outlook2,omitempty"`
	// Outlook3 holds the value of the "outlook3" field.
	Outlook3 string `json:"outlook3,omitempty"`
	// Waiting1 holds the value of the "waiting1" field.
	Waiting1 string `json:"waiting1,omitempty"`
	// Waiting2 holds the value of the "waiting2" field.
	Waiting2 string `json:"waiting2,omitempty"`
	// Ordering1 holds the value of the "ordering1" field.
	Ordering1 string `json:"ordering1,omitempty"`
	// Ordering2 holds the value of the "ordering2" field.
	Ordering2 string `json:"ordering2,omitempty"`
	// Ordering3 holds the value of the "ordering3" field.
	Ordering3 string `json:"ordering3,omitempty"`
	// Service1 holds the value of the "service1" field.
	Service1 string `json:"service1,omitempty"`
	// Service2 holds the value of the "service2" field.
	Service2 string `json:"service2,omitempty"`
	// Service3 holds the value of the "service3" field.
	Service3 string `json:"service3,omitempty"`
	// Qunility1 holds the value of the "qunility1" field.
	Qunility1 string `json:"qunility1,omitempty"`
	// Qunility2 holds the value of the "qunility2" field.
	Qunility2 string `json:"qunility2,omitempty"`
	// Qunility3 holds the value of the "qunility3" field.
	Qunility3 string `json:"qunility3,omitempty"`
	// Value1 holds the value of the "value1" field.
	Value1 string `json:"value1,omitempty"`
	// Value2 holds the value of the "value2" field.
	Value2 string `json:"value2,omitempty"`
	// Comment holds the value of the "comment" field.
	Comment string `json:"comment,omitempty"`
	// Rating holds the value of the "rating" field.
	Rating int `json:"rating,omitempty"`
	// Createdat holds the value of the "createdat" field.
	Createdat    time.Time `json:"createdat,omitempty"`
	selectValues sql.SelectValues
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Opinions) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case opinions.FieldRating:
			values[i] = new(sql.NullInt64)
		case opinions.FieldID, opinions.FieldName, opinions.FieldTelephone, opinions.FieldBrand, opinions.FieldResturtant, opinions.FieldOutlook1, opinions.FieldOutlook2, opinions.FieldOutlook3, opinions.FieldWaiting1, opinions.FieldWaiting2, opinions.FieldOrdering1, opinions.FieldOrdering2, opinions.FieldOrdering3, opinions.FieldService1, opinions.FieldService2, opinions.FieldService3, opinions.FieldQunility1, opinions.FieldQunility2, opinions.FieldQunility3, opinions.FieldValue1, opinions.FieldValue2, opinions.FieldComment:
			values[i] = new(sql.NullString)
		case opinions.FieldTime, opinions.FieldCreatedat:
			values[i] = new(sql.NullTime)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Opinions fields.
func (o *Opinions) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case opinions.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				o.ID = value.String
			}
		case opinions.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				o.Name = value.String
			}
		case opinions.FieldTelephone:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field telephone", values[i])
			} else if value.Valid {
				o.Telephone = value.String
			}
		case opinions.FieldTime:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field time", values[i])
			} else if value.Valid {
				o.Time = value.Time
			}
		case opinions.FieldBrand:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field brand", values[i])
			} else if value.Valid {
				o.Brand = value.String
			}
		case opinions.FieldResturtant:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field resturtant", values[i])
			} else if value.Valid {
				o.Resturtant = value.String
			}
		case opinions.FieldOutlook1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field outlook1", values[i])
			} else if value.Valid {
				o.Outlook1 = value.String
			}
		case opinions.FieldOutlook2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field outlook2", values[i])
			} else if value.Valid {
				o.Outlook2 = value.String
			}
		case opinions.FieldOutlook3:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field outlook3", values[i])
			} else if value.Valid {
				o.Outlook3 = value.String
			}
		case opinions.FieldWaiting1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field waiting1", values[i])
			} else if value.Valid {
				o.Waiting1 = value.String
			}
		case opinions.FieldWaiting2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field waiting2", values[i])
			} else if value.Valid {
				o.Waiting2 = value.String
			}
		case opinions.FieldOrdering1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field ordering1", values[i])
			} else if value.Valid {
				o.Ordering1 = value.String
			}
		case opinions.FieldOrdering2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field ordering2", values[i])
			} else if value.Valid {
				o.Ordering2 = value.String
			}
		case opinions.FieldOrdering3:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field ordering3", values[i])
			} else if value.Valid {
				o.Ordering3 = value.String
			}
		case opinions.FieldService1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field service1", values[i])
			} else if value.Valid {
				o.Service1 = value.String
			}
		case opinions.FieldService2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field service2", values[i])
			} else if value.Valid {
				o.Service2 = value.String
			}
		case opinions.FieldService3:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field service3", values[i])
			} else if value.Valid {
				o.Service3 = value.String
			}
		case opinions.FieldQunility1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field qunility1", values[i])
			} else if value.Valid {
				o.Qunility1 = value.String
			}
		case opinions.FieldQunility2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field qunility2", values[i])
			} else if value.Valid {
				o.Qunility2 = value.String
			}
		case opinions.FieldQunility3:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field qunility3", values[i])
			} else if value.Valid {
				o.Qunility3 = value.String
			}
		case opinions.FieldValue1:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field value1", values[i])
			} else if value.Valid {
				o.Value1 = value.String
			}
		case opinions.FieldValue2:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field value2", values[i])
			} else if value.Valid {
				o.Value2 = value.String
			}
		case opinions.FieldComment:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field comment", values[i])
			} else if value.Valid {
				o.Comment = value.String
			}
		case opinions.FieldRating:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field rating", values[i])
			} else if value.Valid {
				o.Rating = int(value.Int64)
			}
		case opinions.FieldCreatedat:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field createdat", values[i])
			} else if value.Valid {
				o.Createdat = value.Time
			}
		default:
			o.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Opinions.
// This includes values selected through modifiers, order, etc.
func (o *Opinions) Value(name string) (ent.Value, error) {
	return o.selectValues.Get(name)
}

// Update returns a builder for updating this Opinions.
// Note that you need to call Opinions.Unwrap() before calling this method if this Opinions
// was returned from a transaction, and the transaction was committed or rolled back.
func (o *Opinions) Update() *OpinionsUpdateOne {
	return NewOpinionsClient(o.config).UpdateOne(o)
}

// Unwrap unwraps the Opinions entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (o *Opinions) Unwrap() *Opinions {
	_tx, ok := o.config.driver.(*txDriver)
	if !ok {
		panic("ent: Opinions is not a transactional entity")
	}
	o.config.driver = _tx.drv
	return o
}

// String implements the fmt.Stringer.
func (o *Opinions) String() string {
	var builder strings.Builder
	builder.WriteString("Opinions(")
	builder.WriteString(fmt.Sprintf("id=%v, ", o.ID))
	builder.WriteString("name=")
	builder.WriteString(o.Name)
	builder.WriteString(", ")
	builder.WriteString("telephone=")
	builder.WriteString(o.Telephone)
	builder.WriteString(", ")
	builder.WriteString("time=")
	builder.WriteString(o.Time.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("brand=")
	builder.WriteString(o.Brand)
	builder.WriteString(", ")
	builder.WriteString("resturtant=")
	builder.WriteString(o.Resturtant)
	builder.WriteString(", ")
	builder.WriteString("outlook1=")
	builder.WriteString(o.Outlook1)
	builder.WriteString(", ")
	builder.WriteString("outlook2=")
	builder.WriteString(o.Outlook2)
	builder.WriteString(", ")
	builder.WriteString("outlook3=")
	builder.WriteString(o.Outlook3)
	builder.WriteString(", ")
	builder.WriteString("waiting1=")
	builder.WriteString(o.Waiting1)
	builder.WriteString(", ")
	builder.WriteString("waiting2=")
	builder.WriteString(o.Waiting2)
	builder.WriteString(", ")
	builder.WriteString("ordering1=")
	builder.WriteString(o.Ordering1)
	builder.WriteString(", ")
	builder.WriteString("ordering2=")
	builder.WriteString(o.Ordering2)
	builder.WriteString(", ")
	builder.WriteString("ordering3=")
	builder.WriteString(o.Ordering3)
	builder.WriteString(", ")
	builder.WriteString("service1=")
	builder.WriteString(o.Service1)
	builder.WriteString(", ")
	builder.WriteString("service2=")
	builder.WriteString(o.Service2)
	builder.WriteString(", ")
	builder.WriteString("service3=")
	builder.WriteString(o.Service3)
	builder.WriteString(", ")
	builder.WriteString("qunility1=")
	builder.WriteString(o.Qunility1)
	builder.WriteString(", ")
	builder.WriteString("qunility2=")
	builder.WriteString(o.Qunility2)
	builder.WriteString(", ")
	builder.WriteString("qunility3=")
	builder.WriteString(o.Qunility3)
	builder.WriteString(", ")
	builder.WriteString("value1=")
	builder.WriteString(o.Value1)
	builder.WriteString(", ")
	builder.WriteString("value2=")
	builder.WriteString(o.Value2)
	builder.WriteString(", ")
	builder.WriteString("comment=")
	builder.WriteString(o.Comment)
	builder.WriteString(", ")
	builder.WriteString("rating=")
	builder.WriteString(fmt.Sprintf("%v", o.Rating))
	builder.WriteString(", ")
	builder.WriteString("createdat=")
	builder.WriteString(o.Createdat.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// OpinionsSlice is a parsable slice of Opinions.
type OpinionsSlice []*Opinions