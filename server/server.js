require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.PORT || 8000;

// Create SQLite database connection
const db = new sqlite3.Database('./books.db'); // Replace with your desired database file name or path

// Create 'books' table
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, price REAL, image TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)'
  );
});

// List all books
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books ORDER BY id DESC';
  db.all(query, (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    res.json(rows);
  });
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, price, image } = req.body;
  const query =
    'INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)';
  db.run(query, [title, author, price, image], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    const id = this.lastID;
    res.json({ id, title, author, price, image });
  });
});

// Update a book
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, price, image } = req.body;
  const query =
    'UPDATE books SET title = ?, author = ?, price = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  db.run(
    query,
    [title, author, price, image, id],
    function (error) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ id, title, author, price, image });
    }
  );
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  db.run(query, [id], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
