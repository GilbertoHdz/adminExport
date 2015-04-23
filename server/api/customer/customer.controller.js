'use strict';

var Customer = require('./customer.model');
var excelReport = require('excel-report');
var express = require('express');
var _ = require('lodash');
var fs = require('fs');

// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  console.log('create');
  Customer.create(req.body, function(err, customer) {
    console.log(req.body);
    console.log(customer);

    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    customer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


//// Get list of customers
//exports.csv = function(req, res) {
//  Customer.find(function (err, customers) {
//    if(err) { return handleError(res, err); }
//    json2csv({data: customers, fields: ['name', 'author', 'f_ini']}, function(err, csv) {
//      if (err) console.log(err);
//      return csv;
//    });
//  });
//};


exports.excel = function(req, res) {
  //console.log(Math.floor(Math.random()*100));
  //npm install excel-report --save

    var data ={title:'Voucher List',company:'STP software',address:'56, 13C Street, Binh Tri Dong B ward, Binh Tan district, Ho Chi Minh City',user_created:'TRUONGPV'};
        data.table1 =[{date:new Date(Date.UTC(2015,0,13)),number:1,description:'description 1',qty:10}
            ,{date:new Date(Date.UTC(2015,0,14)),number:2,description:'description 2',qty:20}
            ,{date:new Date(Date.UTC(2015,0,14)),number:5,description:'description 2',qty:30}
        ];

  var template_file = __dirname + '/template.xlsx';

  //var writeStream = fs.createWriteStream('output.xlsx');

  //return res.send(data); //si quiero que pare aquí

  excelReport(template_file, data, function(error,binary){
    if(error){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.end(error);
      return
    }
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=Customer-"+Number(new Date())+".xlsx");
    res.end(binary, 'binary');

  });
  
};


function handleError(res, err) {
  return res.send(500, err);
}