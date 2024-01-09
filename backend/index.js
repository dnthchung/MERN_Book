import express from "express";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/bookRoute.js";

const app = express();
//Middleware for parsing req body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});
//express route to manage book route
app.use("/books", booksRoute);

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
