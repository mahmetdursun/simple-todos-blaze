//! vu dosya içindeki tüm js ler soru cevap haftasında yapıldı aktif değiller
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'products.create',
  validate: new SimpleSchema({
    product: ProductSchema.omit('state'),
  }).validator(),
  run: function (data) {
    this.unblock();
    const {product} = data;

    product.state = 'in-progress';
    return Products.insert(product);
  }
});