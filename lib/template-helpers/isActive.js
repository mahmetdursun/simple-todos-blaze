// Gerekli Meteor paketlerini içeri aktarıyoruz
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'; // Router işlemleri için

// Sayfanın aktif olup olmadığını kontrol eden yardımcı fonksiyon
IsActive = function (name, htmlClass) {
  let isActive = false;
  const route = FlowRouter._current.route;

  if (route.name == name || route.name.includes(name)) {
    isActive = true;
  }

  if (isActive) {
    return htmlClass || 'active'
  }
}

Template.registerHelper('isActive', function (value, htmlClass) {
  FlowRouter.watchPathChange();
  return IsActive(value, htmlClass);
});




// Gerekli Meteor paketlerini içeri aktarıyoruz
// import { FlowRouter } from 'meteor/ostrio:flow-router-extra'; // Router işlemleri için
// import { Template } from 'meteor/templating'; // Blaze template işlemleri için

// // Sayfanın aktif olup olmadığını kontrol eden yardımcı fonksiyon
// function IsActive(value) {
//   let isActive = false;
//   const path = FlowRouter._current.path; // Geçerli sayfa path'ini al

//   if (value === '/') {
//     // Ana sayfa kontrolü
//     isActive = path === '/';
//   } else {
//     // URL'in son kısmını al (örneğin: /about?x=1 -> about)
//     const lastIndex1 = path.lastIndexOf('/');
//     const lastIndex2 = path.lastIndexOf('?');
//     const currentPath = path.substring(lastIndex1 + 1, lastIndex2 !== -1 ? lastIndex2 : path.length);
//     isActive = value === currentPath; // Parametre ile eşleşip eşleşmediğine bak
//   }

//   return isActive;
// }

// // Tüm uygulamada kullanılabilecek global yardımcı obje
// // Hem client hem server tarafı için kontrol
// if (typeof Util === 'undefined') {
//   globalThis.Util = {
//     name: '',
//     log(message) {
//       console.log(message);
//     }
//   };
// }


// // Client tarafı için tanımlamalar
// if (Meteor.isClient) {
//   // Tarayıcı konsoluna log atmak için client helper
//   Util.log = (message) => {
//     console.log(message);
//   };

//   // Blaze template helper: {{isActive 'about'}} gibi kullanılır
//   Template.registerHelper('isActive', function (value, htmlClass) {
//     FlowRouter.watchPathChange(); // Sayfa değişikliklerini dinle
//     return IsActive(value, htmlClass); // Yardımcı fonksiyonu çağır
//   });
// }

// // Server tarafı için aynı log fonksiyonunu tanımlıyoruz
// if (Meteor.isServer) {
//   Util.log = (message) => {
//     console.log(message);
//   };
// }

// // Mobil ve Web i ayırır
// if (Meteor.isCordova) {
//   // Bu kod sadece mobil cihazda (Android/iOS) çalışır.
//   // Örneğin: kamera açmak, dosya sistemi erişimi, vs.
//   console.log('Mobil cihazda çalışıyor (Cordova)');
// } else {
//   // Bu kod web tarayıcısında çalışır.
//   // Örneğin: DOM işlemleri, tarayıcıya özel bildirimler, vs.
//   console.log('Web tarayıcısında çalışıyor');
// }
