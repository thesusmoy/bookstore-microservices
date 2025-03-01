const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Place an order
app.post('/orders', async (req, res) => {
    const { bookId, userId } = req.body;

    // Validate bookId to ensure it only contains alphanumeric characters
    const isValidBookId = /^[a-zA-Z0-9]+$/.test(bookId);
    if (!isValidBookId) {
        return res.status(400).send('Invalid bookId');
    }

    // Call Inventory Service to check stock
    const inventoryResponse = await axios.get(
        `http://localhost:3004/inventory/${bookId}`
    );
});
