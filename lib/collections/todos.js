import SimpleSchema from "simpl-schema";

Todos = new Mongo.Collection("todos");

TodoSchema = new SimpleSchema({
  name: String,

  description: {
    type: String,
    optional: true,
  },
  state: {
    type: String,
    allowedValues: ["in-progress", "done"],
  },
});

Todos.attachSchema(TodoSchema); // attachSchema, collection2 varsa çalışır
