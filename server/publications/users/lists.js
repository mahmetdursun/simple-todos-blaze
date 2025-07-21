Meteor.publish('users.list', function(data) {
   if (this.userId) {
    return Meteor.users.find({}, {fields: {profile: 1, emails: 1}}) //kullanıcı bilgilerinden sadece isim ve maili çağırıyoruz
   } else {
    return this.ready()
   }
});