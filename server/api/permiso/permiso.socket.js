/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Permiso = require('./permiso.model');

exports.register = function(socket) {
  Permiso.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Permiso.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('permiso:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('permiso:remove', doc);
}