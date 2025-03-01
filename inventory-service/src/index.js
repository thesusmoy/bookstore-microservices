const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventorydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    bookId: String,
    stock: Number,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

// rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
});

// Update inventory
app.post('/inventory/:bookId', limiter, async (req, res) => {
    const { bookId } = req.params;
    const { stock } = req.body;
    await Inventory.findOne({ bookId }, { stock });
    res.send('Inventory updated successfully');
});

// Get stock
app.get('/inventory/:bookId', limiter, async (req, res) => {
    const { bookId } = req.params;
    const inventory = await Inventory.findOne({ bookId });
    res.json(inventory);
});

app.listen(3004, () => {
    console.log('Inventory service started on port 3004');
});
