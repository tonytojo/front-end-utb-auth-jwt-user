//Define some npm package
const router = require('express').Router();
const User   = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Use destructuring from module ../validation
const { registerValidation, loginValidation } = require('../validation');

// url = api/user/register
router.post('/register', async (req, res) => {

   //If error exist use destructuring to get error from module registerValidation
   const {error} = registerValidation(req.body);

   if(error){
      return res.status(400).json( {error: error.details[0].message} );
   }

   const emailExist = await User.findOne( {email:req.body.email} );

   if (emailExist){
      return res.status(400).json({error:'Email exist'});
   }

   //Create Hash password by using salt
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   //We have a valid reg.body according to schema so create an object from it
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
   });

   //Try to save the created user in db
   try{
      const savedUser = await user.save();

      //Create the token. The first argument is the payload which will be base64 encoded
      //algoritm+secretKey(Base64 on header+payload) ger signature
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

      //Return to browser an object with user:user._id, redirect:batcave, token
      return res.json( {user: user._id, redirect: 'batcave', token, status:'success'} );
   }
   catch(error)
   {
      res.status(400).json(error);
   }
});

// url api/user/login
router.post('/login', async (req,res) => {
   const {error} = loginValidation(req.body); 

   if (error){
      return res.status(400).json( {error: error.details[0].message} );
   }

   const user = await User.findOne({email: req.body.email});

   if (!user){
      return res.status(400).json({error: 'Email is not found'});
   }

   const validPassword = await bcrypt.compare(req.body.password, user.password);

   if(!validPassword){
      return res.status(400).json({error: 'Invalid password'});
   }

   //Apply an algoritm with key on header and payload by using jwt.sign
   const token = jwt.sign( {_id: user._id}, process.env.TOKEN_SECRET);

   res.header('auth-token', token).json({token, redirect:'batcave'});

});

module.exports = router;
