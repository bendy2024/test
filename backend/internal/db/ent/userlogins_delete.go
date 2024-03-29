// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"erm/internal/db/ent/predicate"
	"erm/internal/db/ent/userlogins"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// UserloginsDelete is the builder for deleting a Userlogins entity.
type UserloginsDelete struct {
	config
	hooks    []Hook
	mutation *UserloginsMutation
}

// Where appends a list predicates to the UserloginsDelete builder.
func (ud *UserloginsDelete) Where(ps ...predicate.Userlogins) *UserloginsDelete {
	ud.mutation.Where(ps...)
	return ud
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ud *UserloginsDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, ud.sqlExec, ud.mutation, ud.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (ud *UserloginsDelete) ExecX(ctx context.Context) int {
	n, err := ud.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ud *UserloginsDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(userlogins.Table, sqlgraph.NewFieldSpec(userlogins.FieldID, field.TypeInt))
	if ps := ud.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, ud.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	ud.mutation.done = true
	return affected, err
}

// UserloginsDeleteOne is the builder for deleting a single Userlogins entity.
type UserloginsDeleteOne struct {
	ud *UserloginsDelete
}

// Where appends a list predicates to the UserloginsDelete builder.
func (udo *UserloginsDeleteOne) Where(ps ...predicate.Userlogins) *UserloginsDeleteOne {
	udo.ud.mutation.Where(ps...)
	return udo
}

// Exec executes the deletion query.
func (udo *UserloginsDeleteOne) Exec(ctx context.Context) error {
	n, err := udo.ud.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{userlogins.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (udo *UserloginsDeleteOne) ExecX(ctx context.Context) {
	if err := udo.Exec(ctx); err != nil {
		panic(err)
	}
}
