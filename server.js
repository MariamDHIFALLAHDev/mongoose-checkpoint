const express = require("express");
const mongoose = require("mongoose");

// Create a server and listen to the PORT
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server successfully connected"));

// Connect to the database
const uri = require("./config/keys").mongoURI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("successfully connected to the databse"))
  .catch(() => console.log("failed to connect to the database"));

// Requiring our persons Model
const Persons = require("./models/persons");



// Create many persons
Persons.create([
  {
    name: "Mariam",
    age: 27,
    favoriteFoods: ["fish", "apple"],
  },
  {
    name: "Zied",
    age: 30,
  },
  {
    name: "Mohamed",
    age: 18,
    favoriteFoods: ["meat", "borito"],
  },
  {
    name: "Eya",
    age: 24,
    favoriteFoods: ["borito", "cheese"],
  },
  {
    name: "Arslan",
    age: 18,
    favoriteFoods: ["borito", "cookies"],
  },
  {
    name: "Eva",
    age: 22,
    favoriteFoods: ["meat", "cookies"],
  }
]);
 
// Find persons who likes borito
Persons.find({favoriteFoods:'borito'},(err,person) => {
    if(err) console.log(err);
    else console.log(person)
})

// Find the first person who likes borito
Persons.findOne({favoriteFoods:"borito"},(err,person) => {
    if(err) console.log(err);
    else console.log(person)
})

// Find person by ID 
Persons.findById("5f4d2641599bf15278b562d6", (err,person) => {
    if(err) console.log(err);
    else console.log(person)
})

// Update by running Find, Edit then Save
Persons.findById("5f4d2641599bf15278b562d6",(err,person) => {
    if(err) console.log(err);
    else {
        person.favoriteFoods.push("hamburger");
        person.save();
    }
})

// Or use Update method
Persons.updateOne({name:"Eva"}, { $set : {favoriteFoods : ['borito','cheese','milk'] }},err => {
    if(err) console.log(err)
} )

// Find One and Update
Persons.findOneAndUpdate({name:"Mariam"},{age:25},{new:true},(err,person) => {
    if(err) console.log(err);
    else console.log(person.age)
})

//  Delete one by ID
Persons.findByIdAndRemove("5f4d2641599bf15278b562d2", err => {
    if(err) console.log(err);
    else console.log("documenet deleted")
})

// Remove persons with the age of 18
Persons.remove({age:18}, err => {
    if(err) console.log(err)
}) 

// Find persons who likes borito and sort and limit them without displaying the age
Persons.find({favoriteFoods:"meat"}).sort({name:1}).limit(2).exec((err,data)=>{
  if(err) console.log(err);
  else console.log(data)
  
})

