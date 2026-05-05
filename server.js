const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Cake = require('./models/Cake');

const app = express();

// FIXED CORS: This allows your specific frontend to access the data
app.use(cors({
    origin: 'https://meraki-frontend-nine.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/assets', express.static('assets'));

app.use(express.json());

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
    res.send("Meraki API is running...");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));