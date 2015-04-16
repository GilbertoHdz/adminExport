'use strict';

var _ = require('lodash');
var Permiso = require('./permiso.model');

// Get list of permisos
exports.index = function(req, res) {
  Permiso.find(function (err, permisos) {
    if(err) { return handleError(res, err); }
    return res.json(200, permisos);
  });
};

// Get a single permiso
exports.show = function(req, res) {
  Permiso.findById(req.params.id, function (err, permiso) {
    if(err) { return handleError(res, err); }
    if(!permiso) { return res.send(404); }
    return res.json(permiso);
  });
};

// Creates a new permiso in the DB.
exports.create = function(req, res) {
  Permiso.create(req.body, function(err, permiso) {
    if(err) { return handleError(res, err); }
    return res.json(201, permiso);
  });
};

// Updates an existing permiso in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Permiso.findById(req.params.id, function (err, permiso) {
    if (err) { return handleError(res, err); }
    if(!permiso) { return res.send(404); }
    var updated = _.merge(permiso, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, permiso);
    });
  });
};

// Deletes a permiso from the DB.
exports.destroy = function(req, res) {
  Permiso.findById(req.params.id, function (err, permiso) {
    if(err) { return handleError(res, err); }
    if(!permiso) { return res.send(404); }
    permiso.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}