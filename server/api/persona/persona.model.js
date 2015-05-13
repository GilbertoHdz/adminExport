'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonaSchema = new Schema({
  name: String,
  info: String,
  skills: { type: Object},
  active: { type: Boolean, default: true },
  img: String,
  archivos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Archivo'}]
});

module.exports = mongoose.model('Persona', PersonaSchema);