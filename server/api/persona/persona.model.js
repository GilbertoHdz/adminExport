'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonaSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Persona', PersonaSchema);