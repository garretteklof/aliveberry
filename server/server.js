require("./config/config");

const _ = require("lodash");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Book } = require("./models/book");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

/***************************** GOOGLE BOOKS API *****************************/

app.post("/api", async (req, res) => {
  const { query, field } = req.body;
  const encodedQuery = encodeURIComponent(query);
  const maxResults = 12;
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${field}:${encodedQuery}&key=${
      process.env.GOOGLE_BOOKS_API_KEY
    }&maxResults=${maxResults}`;
    const { data } = await axios.get(url);
    res.send(data.items);
  } catch (e) {
    res.status(400).send();
  }
});

/***************************** BOOKS *****************************/

app.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    pageCount: req.body.pageCount,
    thumbnailLink: req.body.thumbnailLink,
    shelfStatus: req.body.shelfStatus
  });
  try {
    const doc = await book.save();
    res.send(doc);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOne({
      _id: id
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send({ book });
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOneAndRemove({
      _id: id
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send({ book });
  } catch (e) {
    res.status(400).send();
  }
});

app.patch("/books/:id", async (req, res) => {
  const id = req.params.id;
  const { shelfStatus } = _.pick(req.body, ["shelfStatus"]);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOneAndUpdate(
      { _id: id },
      { $set: { shelfStatus } },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).send();
    }
    res.send({ book });
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started server on port ${port}!`);
});

module.exports = { app };
