require("./config/config");

const path = require("path");
const _ = require("lodash");
const axios = require("axios");
const express = require("express");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Book } = require("./models/book");
const { User } = require("./models/user");

const { authenticate } = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");

/***************************** GOOGLE BOOKS API *****************************/

app.post("/api", express.json(), async (req, res) => {
  const { query, field } = req.body;
  const encodedQuery = encodeURIComponent(query);
  const maxResults = 36;
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${field}:${encodedQuery}&key=${
      process.env.GOOGLE_BOOKS_API_KEY
    }&maxResults=${maxResults}`;
    const { data } = await axios.get(url);
    res.send(data.items);
  } catch (e) {
    res.status(400).send(e);
  }
});

/***************************** BOOKS *****************************/

app.post("/books", express.json(), authenticate, async (req, res) => {
  const book = new Book({
    volumeID: req.body.volumeID,
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    pageCount: req.body.pageCount,
    thumbnailLink: req.body.thumbnailLink,
    shelfStatus: req.body.shelfStatus,
    _owner: res.locals.user._id
  });
  try {
    const books = await Book.find({});
    const duplicateBook = books.filter(
      ({ volumeID }) => volumeID === req.body.volumeID
    );
    if (duplicateBook.length) {
      return res.status(400).send({
        error: "Send back a custom error about no duplicate books!"
      });
    }
    const doc = await book.save();
    res.send(doc);
  } catch (e) {
    res.status(400).send();
    // Something went wrong with Google Books
  }
});

app.get("/books", authenticate, async (req, res) => {
  try {
    const books = await Book.find({ _owner: res.locals.user._id });
    res.send(books);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/books/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOne({
      _id: id,
      _owner: res.locals.user._id
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send({ book });
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/books/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOneAndRemove({
      _id: id,
      _owner: res.locals.user._id
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send({ book });
  } catch (e) {
    res.status(400).send();
  }
});

app.patch("/books/:id", express.json(), authenticate, async (req, res) => {
  const id = req.params.id;
  const { shelfStatus } = _.pick(req.body, ["shelfStatus"]);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const book = await Book.findOneAndUpdate(
      { _id: id, _owner: res.locals.user._id },
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

/***************************** USERS *****************************/

app.post("/users", express.json(), async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(res.locals.user);
});

/***************************** LOGIN/LOGOUT *****************************/

app.post("/login", express.json(), async (req, res) => {
  try {
    const { email, password } = _.pick(req.body, ["email", "password"]);
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/logout", authenticate, async (req, res) => {
  try {
    await res.locals.user.removeAuthToken(res.locals.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

/***************************** FRONTEND *****************************/

app.get("*", express.static(publicPath), (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Started server on port ${port}!`);
});

module.exports = { app };
