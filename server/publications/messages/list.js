Meteor.publish('messages.list', function(data) {
   if (this.userId) {
    return Messages.find({})
   } else {
    return this.ready()
   }
});