//Define some npm package
const router = require('express').Router();
const verify = require('./verifyToken');

//url = /api/secure
//method verify
router.get('/', verify, (req,res) => {
   res.redirect('/batcave');
});

module.exports = router;