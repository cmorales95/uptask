const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator'); //?
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// helpers
const helpers = require('./helpers');

// nos conectamos
const db = require('./config/db');
// import models
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(console.log('conectado a la bd'))
    .catch(console.log);

// creating express app
const app = express();

// Loading Static Files
app.use(express.static('public'));

// bodyParser for reading form parameters
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(expressValidator());

// select view engine
app.set('view engine', 'pug');

// Add folder view
app.set('views', path.join(__dirname, './views'));

// add flash
app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false,
}));


// Use vardump in all the app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

// routes
app.use('/', routes());
// run server!!
app.listen(3000, () => {
    console.log('App is !');
    console.log('Press Ctrl+c to quit');
});