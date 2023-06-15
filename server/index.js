const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/user");


mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started http://localhost:${process.env.PORT}`);
});