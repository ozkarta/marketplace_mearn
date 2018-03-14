let mongoose = require('mongoose');
let mongoosastic = require('mongoosastic');
let config = require('../../../config');
let LocalizationString = require('./types/localization.type');
LocalizationString['en'].es_indexed = true;
LocalizationString['ge'].es_indexed = true;
let LocalizationStringSchema = new mongoose.Schema(LocalizationString);

let categorySchema = new mongoose.Schema({
  categoryName: LocalizationStringSchema,
  friendlyId:   LocalizationStringSchema,
  includeInSearch: {type: Boolean, default: false, es_indexed: true},
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    es_indexed: true
  },
  childCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      es_indexed: true
    }
  ]

}, {
  timestamps: true
});

let bonsaiUrl = process.env.BONSAI_URL_GERMANY || config.BONSAI_URL_GERMANY;
console.log(bonsaiUrl);

categorySchema.plugin(mongoosastic, {
  hosts: [bonsaiUrl],
  populate: [
    {path: 'Category', select: 'categoryName friendlyId parentCategory childCategories'}
  ]
});

let categoryModel = mongoose.model('Category', categorySchema);

// categoryModel.createMapping(function(err, mapping){ // Create Elastic index
//   if(err){
//     console.log('error creating mapping for category');
//     console.log(err);
//   }
//   if (mapping) {
//     console.log('Mapping created');
//   }
// });

// let stream = categoryModel.synchronize();
// let count = 0;
// stream.on('data', function(err, doc){
//   if (doc) {
//     count++;
//   }
//   if (err) {
//     console.dir(err);
//   }
// });
// stream.on('close', function(){
//   console.log('indexed ' + count + ' documents!');
// });
// stream.on('error', function(err){
//   console.log(err);
// });

exports.model = categoryModel;
exports.schema = categorySchema;