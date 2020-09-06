const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/db";
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db('db');
//   dbo.createCollection("products", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

router.get('/', (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db");
  //Find the first document in the customers collection:
  dbo.collection("products").find({}).toArray( function(err, result) {
    if (err) throw err;
    res.status(200).json({
      results: result
    });
    db.close();
  });
});
});
// process POST
router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    number: req.body.number
  };
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db");
  var query = { name: req.body.name };
  dbo.collection("products").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.status(200).json({
      message: 'get',
      products: result
    });
    db.close();
  });
});
});

// process PUT
router.put('/', (req, res, next) => {
  console.log(req.body);
  const product = {
    name: req.body.name,
    number: req.body.number
  };

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db");
  var myobj = { name: req.body.name, number: req.body.number };
  dbo.collection("products").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

  res.status(200).json({
    message: 'put',
    prod: product
  });
});

router.delete('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    number: req.body.number
  };
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db");
  var myquery = { name: req.body.name, number: req.body.number };
  dbo.collection("products").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});

  res.status(200).json({
    message: 'Delete',
    prod: product
  });
});
// process attribute
router.get('/:attb', (req, res, next) => {
  const id = req.params.attb;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db");
  //Find the first document in the customers collection:
  dbo.collection("products").find({"_id": new mongo.ObjectID(id)}).toArray( function(err, result) {
    if (err) throw err;
    res.status(200).json({
      results: result
    });
    db.close();
  });
});
  if (id == 'haha') {
    res.status(200).json({
      message:'special param'
    });
  } else {
    ;
  }
});
//export route get post rule
module.exports = router;
