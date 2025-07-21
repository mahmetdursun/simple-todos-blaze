//! soru cevap haftası için yapıldı aktif değil

import SimpleSchema from 'simpl-schema'

Products = new Mongo.Collection('products')

ProductSchema = new SimpleSchema({
  name: String,
  brand: String,
  category: String,
  imageLink: String,
  skinType: String,
})

Products.attachSchema(ProductSchema)
