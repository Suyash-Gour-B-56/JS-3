const axios = require("axios");
const BASE_URL = "http://localhost:5000";
async function getAllBooks() {
  try { const res = await axios.get(`${BASE_URL}/books`); console.log("All Books:", res.data); }
  catch (err) { console.error(err); }
}
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(res => console.log("Book by ISBN:", res.data))
    .catch(err => console.error(err));
}
async function getBookByAuthor(author) {
  const res = await axios.get(`${BASE_URL}/books/author/${author}`);
  console.log("Books by Author:", res.data);
}
async function getBookByTitle(title) {
  const res = await axios.get(`${BASE_URL}/books/title/${title}`);
  console.log("Books by Title:", res.data);
}
(async () => {
  await getAllBooks();
  await getBookByISBN("111");
  await getBookByAuthor("Author A");
  await getBookByTitle("Book One");
})();
