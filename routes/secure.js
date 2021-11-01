//Define some npm package
const router = require('express').Router();
const verify = require('./verifyToken');
const cookieParser = require('cookie-parser');

console.log("In secure.js");

//url = /api/secure
//method verify
router.get('/protected',verify, (req,res) => {

   res.redirect('/protected.html');
});

module.exports = router;