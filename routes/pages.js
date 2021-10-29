//Define some npm package
const express = require('express');
const router = express.Router();
const path = require('path');

//url = /batcave
router.get('/batcave', (req,res) => {
   //resolve is used for handling path on every plattform
  res.sendFile(path.resolve('public/batcave.html'));   
});

//export so it's available to other files
module.exports = router;