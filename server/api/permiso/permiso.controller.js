'use strict';

var _ = require('lodash');
var fs = require('fs');
var Permiso = require('./permiso.model');
var PDFDocument = require('pdfkit');

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


// Get list of permisos
exports.getPdf = function(req, res) {
  console.log(__dirname + 'client/template.xlsx');
  doc.pipe(fs.createWriteStream('/ruta/al/archivo.pdf'));

  doc.pipe(res);    

  doc.font('fonts/helvetica.ttf')
   .fontSize(25)
   .text('Helvetica rocks!', 100, 100);

  doc.addPage()
   .fontSize(25)
   .text('Acá vienen gráficos!', 100, 100);

  doc.save()
     .moveTo(100, 150)
     .lineTo(100, 250)
     .lineTo(200, 250)
     .fill("#FF3300");

  doc.circle(280, 200, 50)
     .fill("#6600FF");

  doc.scale(0.6)
     .translate(470, 130)
     .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
     .fill('green', 'even-odd')
     .restore();

  doc.text('And here is some wrapped text...', 100, 300)
     .font('Times-Roman', 13)
     .moveDown()
     .text(lorem, {
       width: 412,
       align: 'justify',
       indent: 30,
       columns: 2,
       height: 300,
       ellipsis: true
     });

  doc.end();
  res.send('Pdf');
};