const express = require('express');
const router = express.Router();

//All Authors Route
router.get('/', (req,res) => { //this line corresponds to URL
    res.render('authors/index'); //this corresponds to filename
});

//New Author Route - for displaying the form
router.get('/new', (req,res) => {
    res.render('authors/new');
});

//Post is used for creation
//Create Author Route
router.post('/', (req,res) => {
    res.send('Create');
});

module.exports = router;