let mongoose = require('mongoose');
let LocalizationString = require('./types/localization.type');
let Media = require('./types/media.type');
let Address = require('./types/address.type');

let storeSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'},
  title: {type: String, trim: true},
  friendlyId: {type: String, trim: true},
  shortDescription: {type: String, trim: true},
  longDescription: {type: String, trim: true},
  address: [Address],
  phones: [{type: String, trim: true}],
  emails: [{type: String, trim: true}],
  facebook: {type: String, trim: true},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  keywords: [{type: String, trim: true}],
  termsAndCondition: {type: String, trim: true},
  media: Media,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  rating: {}, // TODO
  sales: [], // TODO
  feedback: [] // TODO

}, {
  timestamps: true
});

let storeModel = mongoose.model('Store', storeSchema);

exports.model = storeModel;
exports.schema = storeSchema;