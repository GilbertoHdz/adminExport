'use strict';

var _ = require('lodash');
var Archivo = require('./archivo.model');
var fs = require('fs');

// Get list of archivos
exports.index = function(req, res) {
  Archivo.find(function (err, archivos) {
    var copy = {};

    archivos.forEach(function(archivo, idx){
      console.log(new Buffer(archivos[idx].img.data).toString('base64'));
      console.log('*-------*');
      archivos[idx].img.data.buffer = new Buffer(archivo.img.data).toString('base64');
      console.log(archivos[idx].img.data );
    });

    copy = archivos;

    console.log(copy)
    //console.log(JSON.stringify(archivos));

    if(err) { return handleError(res, err); }
    return res.json(200, archivos);
  });
};

// Get a single archivo
exports.show = function(req, res) {
  Archivo.findById(req.params.id, function (err, archivo) {
    if(err) { return handleError(res, err); }
    if(!archivo) { return res.send(404); }

    res.writeHead(200, {'Content-Type': archivo.img.contentType});
    res.write('data:'+archivo.img.contentType+';base64,')
    res.write(new Buffer(archivo.img.data).toString('base64'));
    res.end();

    //return res.json(archivo);
  });
};

// Creates a new archivo in the DB.
exports.create = function(req, res) {
   

  var file = req.files.file;
      console.log(file.path);
      console.log(file.headers);

      req.body = {name: file.name , img: {data: fs.readFileSync(file.path), contentType: file.type }}

        
  Archivo.create(req.body, function(err, archivo) {
    console.log('*------*');
    console.log(archivo);
    console.log(req.body);

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


exports.getImage = function(req, res) {
  Archivo.findById(req.params.id, function(err, archivo) {
      var img = new Buffer(archivo.imgDataField, 'base64');
      var base64Image = img;
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': base64Image.buffer.length
      });
      res.end(base64Image.buffer);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}