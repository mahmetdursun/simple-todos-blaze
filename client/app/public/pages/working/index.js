import { Todos } from '/lib/collections/todos.js';

Template.publicPageWorking.onCreated(function() { 
     this.count = new ReactiveVar(0); 
     this.maps = new ReactiveDict(null, {
        name: 'Ahmet',
        lastname: 'Dursun',
        count: 0
     }); 
});

Template.publicPageWorking.onRendered(function() {
    const self = this

    //?reactiveVar kullanımı
    this.autorun(function() {
       const count = self.count.get(); //aşağıdaki template.count.get yerine self.count.get() kullanıldı
        console.log(count);
    });
    
    //? reactiveDict kullanımı
    this.autorun(function() {
        const name = self.maps.get('count'); // maps içindeki name değerini alır
         //! get ve all kullanımı var get birini seç çağırır all hepsini çağırır
        console.log(name);

        //? bunun yerine server todos metodunu kullanıcaz
        // const todos = Todos.find().fetch(); //? veritabanından tüm todo'ları alır
        // console.log(todos);

         Meteor.call('todos', {_id: 1}, function(error, result) { 
          console.log(error, result);

        });
    });
});

Template.publicPageWorking.helpers({
    //? reactiveVar kullanımı
    count: function() {
        return Template.instance().count //? reaktif değişkeni döndürdük
    },

    //? reactiveDict kullanımı
      maps: function() {
        return Template.instance().maps
    },
    todos: function() {
        return Todos.find().fetch(); //? veritabanından tüm todo'ları alır
    }
});


Template.publicPageWorking.events({
  'click .brd-add': function (event, template) {
    event.preventDefault();
    const currentCount = template.count.get();
    template.count.set(currentCount + 1);

    const currentMapCount = template.maps.get('count');
    template.maps.set('count', currentMapCount + 1);
  },

  'click .brd-insert': function (event, template) {
    event.preventDefault();
    const obj = {
      todo: {
        name: 'my-todo',
        description: 'Çalışma sayfasından eklendi',
      }
    };

    Meteor.call('todos.create', obj, function (error, result) {
      if (error) {
        console.error('Hata oluştu:', error.reason || error.message);
        return;
      }

      console.log('Başarıyla eklendi:', result);
      AppUtil.refreshTokens.set('todos', Random.id());
    });
  },
});


// Template.publicPageWorking.events({ 
    
//   'click .brd-add': function(event, template) { 
//     // ReactiveVar: artır
//     const currentCount = template.count.get();
//     template.count.set(currentCount + 1);

//     // ReactiveDict: aynı şekilde artır
//     const currentMapCount = template.maps.get('count');
//     template.maps.set('count', currentMapCount + 1);
//   },

//   'click .brd-insert': function(event, template) { 
//   try {
//     Todos.insert({
//       name: 'my-todo',
//       state: 'in-progress',
//     });
//     console.log("Todo eklendi");
//   } catch (err) {
//     console.error("Ekleme hatası:", err.message);
//   }
// }
// });


//! Glonal olarak kullanmak istiyorsakta bu şekilde yazarız (self kullanılmamalı)
// Tracker.autorun(function() { 
//       const count = self.count.get(); //yukarıdaki template.count.get yerine self.count.get() kullanıldı 
//       console.log(count);
// });