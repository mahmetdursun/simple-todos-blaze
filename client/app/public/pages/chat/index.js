// Template.publicPageChat.onCreated(function () {
//   this.state = new ReactiveDict(null, {
//     room: null
//   });
// });

import { type } from "jquery";

// Template.publicPageChat.helpers({
//   rooms: function () {
//     return Rooms.find({}).fetch();
//   },
//   messages: function () {
//     return Messages.find({}).fetch();
//   }
// });

// Template.publicPageChat.onRendered(function () {
//   const self = this;

//   this.autorun(function () {
//     const room = self.state.get('room');

//     if (!room) {
//       return;
//     }

//     self.subscribeId =  Meteor.subscribe('messages.list', room._id);

//   });
// });

// Template.publicPageChat.events({
//   'submit form#brdPublicPageChatRoomCreateForm': function (event, template) {
//     event.preventDefault();

//     const name = event.target.name.value;

//     const obj = {
//       room: {
//         name: name,
//       }
//     }

//     Meteor.call('rooms.create', obj, function (error, result) {
//       if (error) {
//         ErrorHandler.show(error);
//         return;
//       }

//       event.target.reset();
//     });
//   },
//   'submit form#brdPublicPageChatMessageCreateForm': function (event, template) {
//     event.preventDefault();

//     const message = event.target.message.value;
//     const room = template.state.get('room');

//     const obj = {
//       message: {
//         roomId: room._id,
//         // userId: userId,
//         message: message,
//       }
//     }

//     Meteor.call('messages.create', obj, function (error, result) {
//       if (error) {
//         console.log('error', error);
//       }

//       event.target.reset();
//     });
//   },
//   'click .brd-select-room': function (event, template) {
//     event.preventDefault();

//     template.state.set('room', this);
//   }
// });

// Template.publicPageChat.onDestroyed(function() { 
//    this.subscribeId?.stop()
// });


//! YENİ BURADAN BAŞLIYOR

// Template.publicPageChat.onCreated(function () {
//   this.state = new ReactiveDict(null, {
//     room: null
//   });
// });

// Template.publicPageChat.helpers({
//   rooms: function () {
//     return Rooms.find({}).fetch();
//   },
//   messages: function () {
//     return Messages.find({}).fetch();
//   }
// });

Template.publicPageChat.onRendered(function () {
  const self = this;
  self.subscribeMessages = Meteor.subscribe('messages.list');
  self.subscribeUsers = Meteor.subscribe('users.list');
});

Template.publicPageChat.helpers({
  messages: function() {
    return Messages.find({}).fetch() //? mesajları minimongodan çağırdık
  },
  users: function() {
    return Meteor.users.find({}).fetch() 
  },
  getUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  },
});

Template.publicPageChat.events({

  'submit form#brdPublicPageChatMessageCreateForm': function (event, template) {
    event.preventDefault();

    const text = event.target.text.value;

    const obj = {
      message: {
        type: 'text',
        payload:{
          text
        }
      }
    }

    Meteor.call('messages.create', obj, function (error, result) {
      if (error) {
        //todo error handling
        console.log('error', error);
      }

      event.target.reset();
    });
  },

  // 'submit form#brdPublicPageChatRoomCreateForm': function (event, template) {
  //   event.preventDefault();

  //   const name = event.target.name.value;

  //   const obj = {
  //     room: {
  //       name: name,
  //     }
  //   }

  //   Meteor.call('rooms.create', obj, function (error, result) {
  //     if (error) {
  //       ErrorHandler.show(error);
  //       return;
  //     }

  //     event.target.reset();
  //   });
  // },

  // 'click .brd-select-room': function (event, template) {
  //   event.preventDefault();

  //   template.state.set('room', this);
  // }
});

Template.publicPageChat.onDestroyed(function() { 
   this.subscribeMessages?.stop()
   this.subscribeUsers?.stop()
});