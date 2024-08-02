import express from "express";
import { PORT, MONGODB } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello :>");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please fill in all the required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const createdBook = await Book.create(newBook);

    return res.status(201).send(createdBook);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/books/:id", async (request, response) => {
  try {
    const id = request.params;

    const books = await Book.find({});
    return response.status(200).json({ books });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please fill in all the required fields" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not Found" });
    }

    res.status(404).json({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

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
