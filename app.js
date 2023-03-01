const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandling=require("./middleware/error-handler");
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use("/tasks/v1", tasks);
app.use(notFound);
app.use(errorHandling);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MongoURI);
    app.listen(port, console.log("Server is running on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

start();
