const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema for persons
const personsSchema = new schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:false
    } ,
    favoriteFoods : 
          [String]
    
})

// Converting persons' schema to a model and export it
const Persons = module.exports = mongoose.model("Persons",personsSchema)