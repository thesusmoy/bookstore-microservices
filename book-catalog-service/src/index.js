const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
});

const Book = mongoose.model('Book', bookSchema);

// Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

app.use(limiter);

// Get all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a book
app.post('/books', async (req, res) => {
    const { title, author, price } = req.body;
    const book = new Book({ title, author, price });
    await book.save();
    res.status(201).json({ message: 'Book added successfully' });
});

app.listen(3002, () => {
    console.log('Book catalog service started on port 3002');
});
