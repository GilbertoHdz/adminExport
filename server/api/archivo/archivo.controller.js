'use strict';

var _ = require('lodash');
var Archivo = require('./archivo.model');
var fs = require('fs');

// Get list of archivos
exports.index = function(req, res) {
  Archivo.find(function (err, archivos) {
    return res.json(200, archivos);
  });
};

// Get a single archivo
exports.show = function(req, res) {
  Archivo.findById(req.params.id, function (err, archivo) {
    if(err) { return handleError(res, err); }
    if(!archivo) { return res.send(404); }
    return res.json(archivo);
  });
};

// Creates a new archivo in the DB.
exports.create = function(req, res) {
   
  var file = req.files.file;
  var imgBuf = new Buffer(fs.readFileSync(file.path)).toString('base64');
      req.body = {name: file.name , img: {data: imgBuf, contentType: file.type }}

  Archivo.create(req.body, function(err, archivo) {
    if(err) { return handleError(res, err); }
    return res.json(201, archivo);
  });
};

// Updates an existing archivo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Archivo.findById(req.params.id, function (err, archivo) {
    if (err) { return handleError(res, err); }
    if(!archivo) { return res.send(404); }
    var updated = _.merge(archivo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, archivo);
    });
  });
};

// Deletes a archivo from the DB.
exports.destroy = function(req, res) {
  Archivo.findById(req.params.id, function (err, archivo) {
    if(err) { return handleError(res, err); }
    if(!archivo) { return res.send(404); }
    archivo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}