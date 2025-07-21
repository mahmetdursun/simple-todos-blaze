//! soru cevap haftası için
Migrations.add({
  version: 1,
  name: 'Products insert',
  up: function () {

    const products = JSON.parse(Assets.getText('seeds/products.json'));

    products.forEach(function (product) {
      Products.insert(product)
    });

  },
});
