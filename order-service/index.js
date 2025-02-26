const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Place an order
app.post('/orders', async (req, res) => {
    const { bookId, userId } = req.body;

    // Call Inventory Service to check stock
    const inventoryResponse = await axios.get(
        `http://localhost:3004/inventory/${bookId}`
    );
});
