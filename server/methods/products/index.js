import { products } from '/lib/collections/products';
Meteor.methods({ 
    products: function(data) { 
        console.log(data)
           return Products.find().fetch(); //? veritabanından tüm product'ları alır  
    }, 
});