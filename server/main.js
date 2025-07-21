import { Meteor } from 'meteor/meteor';

//! dosyalar yüklendikten sonra çalışacak kodlar (client içinde kullanılabilir)
Meteor.startup(() => {
  Migrations.migrateTo('latest');

  // code to run on server at startup
});
