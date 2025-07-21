//! veri oluşturmak için kullanılan todos metodu diğerleride aynı amaçla oluşturuldu
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'todos.create',
  validate: new SimpleSchema({
    todo: TodoSchema.omit('state'),
  }).validator(),
  run: function (data) {
    this.unblock();
    const {todo} = data;

    todo.state = 'in-progress';
    return Todos.insert(todo);
  }
});