import express from "express";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";

const app = express();
//Middleware for parsing req body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

//Route to save a new book
app.post("/books", async (req, res) => {
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
app.get("/books", async (request, response) => {
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
app.get("/books/:id", async (request, response) => {
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
app.put("/books/:id", async (req, res) => {
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
app.delete("/books/:id", async (req, res) => {
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

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("===== CHECK STATUS: APP CONNECT TO DB =====");
    console.log("GOOD: App connect to database");
    app.listen(PORT, () => {
      console.log("===== CHECK STATUS: PORT =====");
      console.log(`GOOD: App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
