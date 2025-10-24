const express = require("express");
let books = require("../booksdb.js");
const authenticated = express.Router();
authenticated.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username, review } = req.body;
  let book = Object.values(books).find(b => b.ISBN === isbn);
  if (book) {
    book.reviews[username] = review;
    return res.json({ message: "Review added/updated", book });
  }
  return res.status(404).json({ message: "Book not found" });
});
authenticated.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username } = req.body;
  let book = Object.values(books).find(b => b.ISBN === isbn);
  if (book && book.reviews[username]) {
    delete book.reviews[username];
    return res.json({ message: "Review deleted", book });
  }
  return res.status(404).json({ message: "Review not found" });
});
module.exports.authenticated = authenticated;
