'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var fs = require('fs');

var ArchivoSchema = new Schema({

  name: String,
  img: { data: String, contentType: String }

});

module.exports = mongoose.model('Archivo', ArchivoSchema);