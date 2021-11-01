//Define some npm package
const express = require('express');
const router = express.Router();
const path = require('path');
const verify = require('./verifyToken');

//url = /batcave
router.get('/test', (req,res) => {
   //resolve is used for handling path on every plattform
  res.sendFile(path.resolve('public/test.html'));   
});

//export so it's available to other files
module.exports = router;