let mongoose = require('mongoose');
let LocalizationString = require('./types/localization.type');
let Media = require('./types/media.type');
let CountryEnum = require('../shared/enum/currency');

let productSchema = new mongoose.Schema({
  store: [{type: mongoose.Schema.Types.ObjectId, ref: 'Store'}],
  friendlyId: LocalizationString,
  title: LocalizationString,
  description: LocalizationString,
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  media: Media,
  quantity: {type: Number, default: 0},
  sale: [{
    currency: {
      type: String,
      enum: CountryEnum,
    },
    price: {
      type: Number,
      default: 0
    }
  }],
  status: {type: String, enum: ['active', 'disabled', 'out_of_stock']},
  rating: {}, // TODO
  sales: [], // TODO
  feedback: [] // TODO
}, {
  timestamps: true
});

let productModel = mongoose.model('Product', productSchema);

exports.model = productModel;
exports.schema = productSchema;