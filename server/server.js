const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const checkJWT = require("./middleware/checkJWT");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users");
require("dotenv").config();
const connectDB = require("./db");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 6001;
app.use("/api/todos", checkJWT, todoRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.sendStatus(200);
});
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
