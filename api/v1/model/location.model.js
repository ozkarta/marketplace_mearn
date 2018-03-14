let mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
}, {
  timestamps: true
});

let locationModel = mongoose.model('Location', locationSchema);

exports.model = locationModel;
exports.schema = locationSchema;