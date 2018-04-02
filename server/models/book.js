const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  volumeID: {
    type: String,
    required: true,
    unique: true
  },
  identifiers: {
    type: [Object],
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  authors: {
    type: [String],
    required: true,
    validate: [
      function() {
        return this.authors.length > 0;
      },
      "Uh oh, {PATH} can't be an empty array."
    ]
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  pageCount: {
    type: Number,
    min: 1,
    default: null
  },
  thumbnailLink: {
    type: String,
    default: ""
  },
  shelfStatus: {
    type: String,
    enum: ["Read", "Currently Reading", "Want to Read"],
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = { Book };
