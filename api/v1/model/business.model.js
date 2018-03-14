let mongoose = require('mongoose');
let LocalizationString = require('./types/localization.type');
let Address = require('./types/address.type');
let businessSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  businessDisplayName: LocalizationString,
  businessType: [],
  businessCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  identificationCode: {},
  registrationCode: {},
  registrationDate: {type: Date},
  address: Address,
  stores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Store'}]
}, {
  timestamps: true
});

let businessModel = mongoose.model('Business', businessSchema);

exports.model = businessModel;
exports.schema = businessSchema;