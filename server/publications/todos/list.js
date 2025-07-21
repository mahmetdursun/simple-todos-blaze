Meteor.publish('todos.list', function(data) {
    return Todos.find({})
});