const mongoose = require('mongoose');

//Schema = table in SQL
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model('Author', authorSchema); //first arg is name of table in database