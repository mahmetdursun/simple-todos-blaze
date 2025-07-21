// import SimpleSchema from 'simpl-schema';

// Cars = new Mongo.Collection('cars');

// CarPayloadSchema = new SimpleSchema({
//     title: String
// });

// CarChoiceSchema = new SimpleSchema({
//     text: String,
//     index: Number,
//     logprobs: SimpleSchema.Any,
//     finish_reason: String,
// });

// CarSchema = new SimpleSchema({
//     title: {
//         type: String,
//         optional: function () {
//             return this.field('number').value > 5
//         },
//         min: 8
//     },                       // Örnek: "BMW M3"
//     number: {
//         type: Number,
//         max: 99
//     },
//     status: {
//         type: String,
//         allowedValues: ['pending', 'in-process', 'cancel', 'done']
//     },
//     boolean: Boolean,                    // Örnek: true / false
//     integer: SimpleSchema.Integer,      // Örnek: 4
//     any: SimpleSchema.Any,              // Her tür veri kabul eder
//     date: Date,                          // Örnek: new Date()
//     payload: {
//         type: CarPayloadSchema,
//         optional: true
//     },

//     lists: Array,
//     'lists.$': {
//         type: String,
//         optional: true
//     },
//     choices: Array,
//     'choices.$': CarChoiceSchema,

//     data: { //* içinde ne veri olduğunu bilmediğimiz durumlarda kullanılıyormuş
//         type: Object,
//         blackbox:true
//     }
// },
//     {
//         //   requiredByDefault: false //? Varsayılan olarak tüm alanlar isteğe bağlı (opsiyonel)
//     }
// );

// Cars.attachSchema(CarSchema);
// // Cars.autoDates(); // Eğer kendi yazdığın bir eklenti varsa aktif edebilirsin
// const _id = Cars.insert({
//     title: 'title',
//     payload: {},
//     lists: ['M3', 'E92', 'M50', 'E30'],
//     choices: [{
//         text: 'ssddsa',
//         index: 33,
//         logprobs: 'daadsasd',
//         finish_reason: 'daaddsa',
//     },
//     {
//         text: 'fgghfgfg',
//         index: 44,
//         logprobs: 'hjkhjkjkh',
//         finish_reason: 'werewrwe',
//     },
// ]
// })

// Messages.update({_id:_id},{

//     $set:{ //oluşturmak için
//         type: 'image'
//     }

// },{})

// Cars.update({_id:_id},{
//     $unset:{ //silmek için (ZORUNLU ALANLARI SİLEMEYİZ)
//         'payload.chatGPT': ''
//     }
// },{})

// Cars.update({_id},{
//     $push:{  //eklemek için
//         lists: 'G20'
//     },
//      $pull:{ //silmek için
//         choices: {_id: 44}
//     },
// },{})

// //! yanlış kullanım
// Cars.update({status: 'pending'},{
//     $set:{ 
//         status: 'cancel'
//     }
// },{multi:true}) //status pending olanların hepsini cancel yapar multi olmazsa sadece ilkini değiştirir

// //* doğru kullanım
// Cars.update({status: {$in: ['pending','in-process']}},{
//     $set:{ 
//         status: 'cancel'
//     }
// },{multi:true})  //iki tanesini birden kapsamak içinde böyle yaparız

// Cars.remove({status: {$in: ['pending','in-process']}})//hepsini silmek için
// Cars.find({status: {$in: ['pending','in-process']}}).fetch()//bütün değerler 
// Cars.findOne({status: {$in: ['pending','in-process']}}) //bir değer