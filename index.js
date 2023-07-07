const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Lemon Tiramisu",
      level: "Easy Peasy",
      ingredients: ["Lemons", "Eggs", "Yolk", "Mascarpone", "Heavy Whipping Cream", "Limoncello", "Basil"],
      cuisine: "Italian",
      dishType: "dessert",
      image: "https://flouringkitchen.com/wp-content/uploads/2022/08/BW1A5918.jpg",
      duration: 60,
      creator: "Mary",
      created: Date.now()
    })
  })
  .then((newRecipe) => {
    console.log("new recipe saved to database:", newRecipe)
  })

  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log("Recipe title:", recipe.title)
    })
  })

  .then(() => {
    return Recipe.findOneAndUpdate({
      id: "64a6c610363b36bec9831410" ,
      duration: 100,
      upsert: true }
      )
  })
  .then(() => {
    console.log("Rigatoni alla Genovese recipe updated successfully to duration of 100 minutes!")
  })

  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake"
    })
  })

  .then(() => {
    console.log("Carrot Cake recipe deleted successfully!")
  })


    .catch(error => {
      console.error('Error connecting to the database', error);
    })

  .finally(() => {
    mongoose.connection.close()
      .then(() => {
      console.log("database successfully closed!")
    })
  })

  .catch(error => {
    console.error("Error disconnecting the database", error);
  });
