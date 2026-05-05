// models/Cake.js
const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ['Cake', 'Pastry', 'Cup Cake'], required: true, default: 'Cake' },
    category: { type: String, enum: ['Anniversary', 'Birthday', 'Premium', 'New Born', 'Children Special', 'Festive Special', 'General'] },
    // Flexible pricing for 250g, 500g, 1kg
    variants: [{
        weight: String,
        price: Number,
        isDefault: Boolean
    }],
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.models.Cake || mongoose.model('Cake', CakeSchema);