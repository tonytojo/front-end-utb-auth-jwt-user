//define some npm package
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) 
{
   const token = req.cookies.token;

   //const token = req.header('auth-token');

   if (!token)
   {
       return res.status(401).json('Access Denied');
   }

   try {       
    
       const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       req.user = verified;
       next();
   }
   catch(error)
   {
       console.log(error);
      res.status(400).json('Invalid Token');
   }
}
