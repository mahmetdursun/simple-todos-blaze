import { Todos } from '/lib/collections/todos';
Meteor.methods({ 
    todos: function(data) { 
        console.log(data)
           return Todos.find().fetch(); //? veritabanından tüm todo'ları alır  
    }, 
});