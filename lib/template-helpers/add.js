//! Bunların genel amacı proje içinde birden çok kullanılabilecek yapıları bir yerde tutmak 
//! meteor add meteorhacks:ssr çalışmadığı için bütün dosyalara import satırını ve if (Meteor.isClient) { } ekledim daha sonrasında sorup düzeltebiliriz
Template.registerHelper('add', function (a) {
  return a + 1;
});