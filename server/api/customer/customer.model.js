'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  info: String,
  author: String,
  f_ini: { type: Date, default: Date.now },
  f_fin: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
// hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Customer', CustomerSchema);