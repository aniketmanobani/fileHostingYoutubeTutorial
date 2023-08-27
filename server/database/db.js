const mongoose = require("mongoose");

// Replace 'your_database_url' with your actual MongoDB connection URL
const dbUrl = "mongodb://localhost:27017/filehostingyt";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
