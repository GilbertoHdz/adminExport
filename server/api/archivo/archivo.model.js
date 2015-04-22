'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArchivoSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Archivo', ArchivoSchema);