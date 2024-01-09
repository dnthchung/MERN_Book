import express from "express";
import { Book } from "../model/bookModel.js";

const router = express.Router();

//Route to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fileds: title, author, publish year.",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.mongoose);
    res.status(500).send({ message: error.message });
  }
});

//Route get all book from db - 14:21
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get a book by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fileds: title, author, publish year.",
      });
    }
    const { id } = req.params;
    const myResult = await Book.findByIdAndUpdate(id, req.body);
    if (!myResult) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book update okay!" });
  } catch (error) {
    console.log(error.mongoose);
    res.status(500).send({ message: error.message });
  }
});

//Route delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const myResult = await Book.findByIdAndDelete(id, req.body);
    if (!myResult) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book delete okay!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
