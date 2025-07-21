import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'todos.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    todo: TodoSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    const { _id, todo } = data;
    return Todos.update({ _id }, {
      $set: todo,
    });

  }
});