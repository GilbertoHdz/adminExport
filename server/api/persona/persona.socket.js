/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Persona = require('./persona.model');

exports.register = function(socket) {
  Persona.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Persona.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('persona:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('persona:remove', doc);
}