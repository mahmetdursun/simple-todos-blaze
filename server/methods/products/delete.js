import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'products.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: function (data) {
    this.unblock();

    return Products.remove({ _id: data._id });
  }
});