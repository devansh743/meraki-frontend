const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({ // Keep this lowercase 'c'
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ['Cake', 'Pastry', 'Cup Cake'], required: true, default: 'Cake' },
    category: { type: String, enum: ['Anniversary', 'Birthday', 'Premium', 'New Born', 'Children Special', 'Festive Special', 'General'] },
    variants: [{
        weight: String,
        price: Number,
        isDefault: Boolean
    }],
    isActive: { type: Boolean, default: true }
});

// The 3rd argument 'meraki' is the SECRET SAUCE. It tells Mongoose 
// exactly which collection to look in.
module.exports = mongoose.model('Cake', cakeSchema, 'meraki');