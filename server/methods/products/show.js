import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'products.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    Products.findOne({ _id: data._id });

  }
});