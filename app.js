const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/tasks/v1", tasks);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MongoURI);
    app.listen(port, console.log("Server is running on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

start();
