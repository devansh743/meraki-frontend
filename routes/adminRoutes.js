const express = require('express');
const router = express.Router();
const Cake = require('../models/Cake');

// POST: Add a new cake
router.post('/add-cake', async (req, res) => {
    try {
        const newCake = new Cake(req.body);
        await newCake.save();
        res.status(201).json({ message: "Cake added successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Remove a cake
router.delete('/delete-cake/:id', async (req, res) => {
    try {
        await Cake.findByIdAndDelete(req.params.id);
        res.json({ message: "Cake removed." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;