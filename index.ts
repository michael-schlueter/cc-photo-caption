import express, { Express } from "express";
import dotenv from "dotenv";
const logger = require("morgan");

dotenv.config();

const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");
const captionRouter = require("./routes/captions");

const app: Express = express();
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/captions", captionRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
