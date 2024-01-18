// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"erm/internal/db/ent/medias"
	"erm/internal/db/ent/predicate"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// MediasUpdate is the builder for updating Medias entities.
type MediasUpdate struct {
	config
	hooks    []Hook
	mutation *MediasMutation
}

// Where appends a list predicates to the MediasUpdate builder.
func (mu *MediasUpdate) Where(ps ...predicate.Medias) *MediasUpdate {
	mu.mutation.Where(ps...)
	return mu
}

// SetOid sets the "oid" field.
func (mu *MediasUpdate) SetOid(s string) *MediasUpdate {
	mu.mutation.SetOid(s)
	return mu
}

// SetPath sets the "path" field.
func (mu *MediasUpdate) SetPath(s string) *MediasUpdate {
	mu.mutation.SetPath(s)
	return mu
}

// Mutation returns the MediasMutation object of the builder.
func (mu *MediasUpdate) Mutation() *MediasMutation {
	return mu.mutation
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (mu *MediasUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, mu.sqlSave, mu.mutation, mu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (mu *MediasUpdate) SaveX(ctx context.Context) int {
	affected, err := mu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (mu *MediasUpdate) Exec(ctx context.Context) error {
	_, err := mu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (mu *MediasUpdate) ExecX(ctx context.Context) {
	if err := mu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (mu *MediasUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(medias.Table, medias.Columns, sqlgraph.NewFieldSpec(medias.FieldID, field.TypeInt))
	if ps := mu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := mu.mutation.Oid(); ok {
		_spec.SetField(medias.FieldOid, field.TypeString, value)
	}
	if value, ok := mu.mutation.Path(); ok {
		_spec.SetField(medias.FieldPath, field.TypeString, value)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, mu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{medias.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	mu.mutation.done = true
	return n, nil
}

// MediasUpdateOne is the builder for updating a single Medias entity.
type MediasUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *MediasMutation
}

// SetOid sets the "oid" field.
func (muo *MediasUpdateOne) SetOid(s string) *MediasUpdateOne {
	muo.mutation.SetOid(s)
	return muo
}

// SetPath sets the "path" field.
func (muo *MediasUpdateOne) SetPath(s string) *MediasUpdateOne {
	muo.mutation.SetPath(s)
	return muo
}

// Mutation returns the MediasMutation object of the builder.
func (muo *MediasUpdateOne) Mutation() *MediasMutation {
	return muo.mutation
}

// Where appends a list predicates to the MediasUpdate builder.
func (muo *MediasUpdateOne) Where(ps ...predicate.Medias) *MediasUpdateOne {
	muo.mutation.Where(ps...)
	return muo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (muo *MediasUpdateOne) Select(field string, fields ...string) *MediasUpdateOne {
	muo.fields = append([]string{field}, fields...)
	return muo
}

// Save executes the query and returns the updated Medias entity.
func (muo *MediasUpdateOne) Save(ctx context.Context) (*Medias, error) {
	return withHooks(ctx, muo.sqlSave, muo.mutation, muo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (muo *MediasUpdateOne) SaveX(ctx context.Context) *Medias {
	node, err := muo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (muo *MediasUpdateOne) Exec(ctx context.Context) error {
	_, err := muo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (muo *MediasUpdateOne) ExecX(ctx context.Context) {
	if err := muo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (muo *MediasUpdateOne) sqlSave(ctx context.Context) (_node *Medias, err error) {
	_spec := sqlgraph.NewUpdateSpec(medias.Table, medias.Columns, sqlgraph.NewFieldSpec(medias.FieldID, field.TypeInt))
	id, ok := muo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Medias.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := muo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, medias.FieldID)
		for _, f := range fields {
			if !medias.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != medias.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := muo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := muo.mutation.Oid(); ok {
		_spec.SetField(medias.FieldOid, field.TypeString, value)
	}
	if value, ok := muo.mutation.Path(); ok {
		_spec.SetField(medias.FieldPath, field.TypeString, value)
	}
	_node = &Medias{config: muo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, muo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{medias.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	muo.mutation.done = true
	return _node, nil
}