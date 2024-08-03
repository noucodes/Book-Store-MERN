import express from "express";
import { PORT, MONGODB } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type  "],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello :>");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Connected to the Database");
    app.listen(PORT, () => {
      console.log(`Port is established at: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
