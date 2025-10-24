const express = require("express");
let books = require("../booksdb.js");
let users = [];
const general = express.Router();
general.get("/books", (req, res) => res.status(200).json(books));
general.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = Object.values(books).find(b => b.ISBN === isbn);
  return book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});
general.get("/books/author/:author", (req, res) => {
  const author = req.params.author;
  let result = Object.values(books).filter(b => b.author === author);
  return res.json(result);
});
general.get("/books/title/:title", (req, res) => {
  const title = req.params.title;
  let result = Object.values(books).filter(b => b.title === title);
  return res.json(result);
});
general.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = Object.values(books).find(b => b.ISBN === isbn);
  return book ? res.json(book.reviews) : res.status(404).json({ message: "Book not found" });
});
general.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });
  if (users.find(u => u.username === username)) return res.status(400).json({ message: "User exists" });
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});
general.post("/login", (req, res) => {
  const { username, password } = req.body;
  let user = users.find(u => u.username === username && u.password === password);
  return user ? res.json({ message: "Login successful" }) : res.status(401).json({ message: "Invalid credentials" });
});
module.exports.general = general;
