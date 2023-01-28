const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
