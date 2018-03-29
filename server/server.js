require("./config/config");

const _ = require("lodash");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

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

/***************************** BOOK *****************************/

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

app.listen(port, () => {
  console.log(`Started server on port ${port}!`);
});

module.exports = { app };
