import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'products.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    product: ProductSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    const { _id, product } = data;
    return Products.update({ _id }, {
      $set: product,
    });

  }
});