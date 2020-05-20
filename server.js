if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs'); //EJS is view engine
app.set('views', __dirname + '/views');//tell the app that the server-rendered views are coming from the view folder - "_dirname" is a global var corresponding to current directory
app.set('layout', 'layouts/layout') //where the compiled HTML of the project will appear

app.use(expressLayouts); //tell the app we want to use express layouts
app.use(express.static('public')); //tell the app where our public files are - stylesheets, javascript, images etc.

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true}); //have to pass in because mongoose setting currently deprecated
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to Mongoose'));

//BodyParser
app.use(express.urlencoded({ limit: '10mb', extended : true}));
app.use(express.json());

//PUT THESE AT THE END!!!!!!!!!!
app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000); //the first option is used during deployment

