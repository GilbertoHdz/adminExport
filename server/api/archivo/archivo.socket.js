/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Archivo = require('./archivo.model');

exports.register = function(socket) {
  Archivo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Archivo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('archivo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('archivo:remove', doc);
}