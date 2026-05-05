const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Required for static paths
require('dotenv').config();

const Cake = require('./models/Cake');
const app = express();

// 1. FIXED CORS: Allows your specific Vercel frontend to talk to this API
app.use(cors({
    origin: 'https://meraki-frontend-nine.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// 2. STATIC ASSETS: This makes your 'assets' folder accessible via URL
// Example: https://meraki-backend-l6mx.onrender.com/assets/images.png
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Meraki Database"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

// API Routes
app.get('/api/cakes', async (req, res) => {
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Root Route (Fixes the "Cannot GET /" display)
app.get('/', (req, res) => {
    res.send("Meraki API is running successfully!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));