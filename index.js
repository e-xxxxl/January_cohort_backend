const express = require('express');
const cors = require("cors")
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose")
const app = express();
const port = 4000;
const userRouter = require("./routes/user.route")
require("dotenv").config()
app.use(express.json())
app.use(cors())
const bodyParser = require("body-parser")
bodyParser.urlencoded({ extended: true })



app.use("/user", userRouter)
const URI = process.env.MONGO_DB_URI
mongoose.connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  })

app.listen(port, () => {
    console.log(`node is running on ${port}`)
  })
  