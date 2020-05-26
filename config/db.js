//  database connection setup
const mongoose = require("mongoose");
const config = require("config");
// getting the value from the default.json file
const db = config.get("mongoURI");

// creating a connection function to our database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected suckas!!!");
  } catch (error) {
    console.error(error.message);
    // Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
