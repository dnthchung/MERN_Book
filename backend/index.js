import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

//move this to mongoose then, if want app run only
//if db connection is successful
// app.listen(PORT, () => {
//   console.log("===== CHECK STATUS: PORT =====");
//   console.log(`GOOD: App is listening to PORT: ${PORT}`);
// });

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
