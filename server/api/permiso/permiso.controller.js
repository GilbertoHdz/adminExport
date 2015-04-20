'use strict';

var _ = require('lodash');
var fs = require('fs');
var Permiso = require('./permiso.model');
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');

// Get list of permisos
exports.index = function(req, res) {
  console.log('index');
  Permiso.find(function (err, permisos) {
    if(err) { return handleError(res, err); }
    return res.json(200, permisos);
  });
};

// Get a single permiso
exports.show = function(req, res) {
  console.log('show');
  Permiso.findById(req.params.id, function (err, permiso) {
    if(err) { return handleError(res, err); }
    if(!permiso) { return res.send(404); }
    return res.json(permiso);
  });
};

// Creates a new permiso in the DB.
exports.create = function(req, res) {
  console.log('create');
  Permiso.create(req.body, function(err, permiso) {
    if(err) { return handleError(res, err); }
    return res.json(201, permiso);
  });
};

// Updates an existing permiso in the DB.
exports.update = function(req, res) {
  console.log('update');
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
  console.log('destroy');
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

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.';

// Get PDF of permisos
exports.getPdf = function(req, res) {

  // create a document and pipe to a blob
  var doc = new PDFDocument();

  // write to PDF
  var createFs = fs.createWriteStream('permisos.pdf');

  doc.pipe(createFs);

  // draw some text
  doc.fontSize(25)
     .text('Heré is séme véctor graphics...', 100, 80);
     
  // some vector graphics
  doc.save()
     .moveTo(100, 150)
     .lineTo(100, 250)
     .lineTo(200, 250)
     .fill("#FF3300");
     
  doc.circle(280, 200, 50)
     .fill("#6600FF");
     
  // an SVG path
  doc.scale(0.6)
     .translate(470, 130)
     .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
     .fill('red', 'even-odd')
     .restore();
     
  // and some justified text wrapped into columns
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

  // HTTP response
  doc.pipe(res);
  
  doc.end();
  return res.download('/permisos.pdf', 'permisos:///tmp/permisos.pdf');
};