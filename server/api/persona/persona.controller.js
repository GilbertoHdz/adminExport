'use strict';

var _ = require('lodash');
var Persona = require('./persona.model');
var Archivo = require('../archivo/archivo.model');
var fs = require('fs');

// Get list of personas
exports.index = function(req, res) {
  Persona.find(function (err, personas) {
    if(err) { return handleError(res, err); }
    return res.json(200, personas);
  });
};

// Get a single persona
exports.show = function(req, res) {
  Persona.findById(req.params.id, function (err, persona) {
    if(err) { return handleError(res, err); }
    if(!persona) { return res.send(404); }
    return res.json(persona);
  });
};

// Creates a new persona in the DB.
exports.create = function(req, res) {
  var _idsDoc = [];

  for (var i = 0, files = req.files.file.length; i < files; i++) {
    var type = req.files.file[i].type;
    var name = req.files.file[i].name;
    var path = req.files.file[i].path;

    var imgBuf = new Buffer(fs.readFileSync(path)).toString('base64');
    var reqArchivo = {name:name , img: {data: imgBuf, contentType: type }}

    var archivo = new Archivo(reqArchivo);
        _idsDoc.push(archivo._id);

      archivo.save(function(err, archivo){
        if(err){ return next(err); }
      });
  };

  var arrData = JSON.parse(req.body.data);
      arrData.skills =  Object.keys(arrData.skills).map(function(k) { return arrData.skills[k].nSkill });
      arrData['archivos'] = _idsDoc;
    
  Persona.create(arrData, function(err, persona) {
    if(err) { return handleError(res, err); }
    return res.json(201, persona);
  });
};

// Updates an existing persona in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Persona.findById(req.params.id, function (err, persona) {
    if (err) { return handleError(res, err); }
    if(!persona) { return res.send(404); }
    var updated = _.merge(persona, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, persona);
    });
  });
};

// Deletes a persona from the DB.
exports.destroy = function(req, res) {
  Persona.findById(req.params.id, function (err, persona) {
    if(err) { return handleError(res, err); }
    if(!persona) { return res.send(404); }
    persona.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}