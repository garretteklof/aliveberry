const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  volumeID: {
    type: String,
    required: true,
    unique: true
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
    required: true
  },
  identifiers: {
    type: [{}]
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
