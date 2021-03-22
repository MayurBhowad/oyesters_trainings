const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const connectDB = require('./config/db.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DATABSE CONNECTION
connectDB();

//Passport config
app.use(passport.initialize());
require('./config/passsport.config')(passport);

//ROUTES
app.use('/api/auth', require('./routes/Auth.routes'));
app.use('/api/task', require('./routes/Task.routes'));

module.exports = app;