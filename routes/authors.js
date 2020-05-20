const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//All Authors Route
router.get('/', async (req,res) => { //this line corresponds to URL
    // res.render('authors/index'); //this corresponds to filename
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i'); //i flag means it is case-insensitive
    }
    try {
      const authors = await Author.find(searchOptions);
      res.render('authors/index', { authors: authors,
      searchOptions: req.query
    }) //search options being sent back to user
    } catch {
      res.redirect('/');
    }
});

//New Author Route - for displaying the form
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
});

//Create Author Route - POST used for creation
router.post('/', async (req,res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`);
    res.redirect('authors');
  } catch {
    let locals = { errorMessage : `something went wrong` } //added this here because it couldn't find errorMessage by itself in partials/errorMessage.ejs
    res.render('authors/new', {
      author: author,
      errorMessage: "Error creating author"
    })
  }
})

module.exports = router;
