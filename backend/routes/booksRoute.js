import express from "express";
import { Book } from "../models/bookModel.js";

const route = express.Router();

route.post("/", async (req, res) => {
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

route.get("/", async (request, response) => {
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

route.get("/:id", async (request, response) => {
  try {
    const id = request.params;

    const books = await Book.find({});
    return response.status(200).json({ books });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {
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

    res.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not Deleted" });
    }

    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default route;
