require("./config/config");

const _ = require("lodash");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Started server on port ${port}!`);
});

module.exports = { app };
