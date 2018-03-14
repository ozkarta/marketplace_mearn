let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  email: {type: String, trim: true},
  passwordHash: {type: String},
  role: {type: String, enum: ['buyer', 'seller','seller-sub-user', 'owner', 'developer']},

  // Only if role = seller
  business: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'}
  // address : {
  //   street: {type: String, trim: true},
  //   city: {type: String, trim: true},
  //   province: {type: String, trim: true},
  //   country: {type: String, trim: true},
  //   zip: {type: String, trim: true}
  // }
}, {
  timestamps: true
});

let userModel = mongoose.model('User', userSchema);

exports.model = userModel;
exports.schema = userSchema;