const express = require('express');
const mongoose = require('mongoose');

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

// Update inventory
app.post('/inventory/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const { stock } = req.body;
    await Inventory.findOne({ bookId }, { stock });
    res.send('Inventory updated successfully');
});

// Get stock
app.get('/inventory/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const inventory = await Inventory.findOne({ bookId });
    res.json(inventory);
});

app.listen(3004, () => {
    console.log('Inventory service started on port 3004');
});
