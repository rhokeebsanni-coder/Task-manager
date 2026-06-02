require("dotenv").config();
const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks.js");
const authRouter = require("./routes/auth.js");
const connectDB = require("./db/connect.js");
const cors = require("cors")
const notFound = require("./middleware/notFound.js")
const errorHandlerMiddleware = require("./middleware/error-handler.js")
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server Listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start()