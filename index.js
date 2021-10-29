//DB_CONNECT = mongodb://localhost:27017/auth-jwt;
//DB_CONNECT = mongodb+srv://Tony:Pissen30060@tonyscluster.qwqe4.mongodb.net/auth-jwt-tony?retryWrites=true&w=majority
//Import some npm package
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

//config will read your .env file, parse the contents, assign it to 
//process.env, and return an Object with a parsed key containing the loaded 
//content or an error key if it failed.
require('dotenv').config();
const pages = require('./routes/pages');

//Connect to mongodb. process.env.DB_CONNECT will read from .env symbol file
mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology :true, useNewUrlParser:true }, () => {
   console.log('Connect to db');
});

//Define authRoute to refer to path ./routes/auth
const authRoute = require('./routes/auth.js');

//Define secureRoute to refer to path ./routes/secure
const secureRoute = require('./routes/secure');

//Used for recognizing incoming Request Object as a JSON Object.
app.use(express.json());

//To serve static files such as images, CSS files, and JavaScript files, use the express. static built-in middleware function in Express. Now, you can load the files that are in the public directory from the /static path prefix. ...
//writing style.ccs in browser will retutn this file
app.use(express.static('public'));

app.use('/api/user', authRoute); //url /api/user will use authRoute
app.use('/api/secure', secureRoute); //url /api/secure will use secureRoute
app.use('/', pages); // url /batcave wil use pages

//Listen on port 3000
app.listen(PORT, () => {
   console.log(`Server connected on port ${PORT}`);
});