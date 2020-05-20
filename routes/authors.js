const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//All Authors Route
router.get('/', (req,res) => { //this line corresponds to URL
    res.render('authors/index'); //this corresponds to filename
});

//New Author Route - for displaying the form
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
});

//Create Author Route - POST used for creation
router.post('/', (req,res) => {
  res.send(req.body.name);
})

module.exports = router;