require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tasksRouter = require("./routes/tasks.js");
const authRouter = require("./routes/auth.js");
const connectDB = require("./db/connect.js");
const notFound = require("./middleware/notFound.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required");
    }

    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
