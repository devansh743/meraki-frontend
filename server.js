const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Cake = require('./models/Cake');
const app = express();

// Allows your Vercel frontend to access this Render backend
const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://meraki-frontend-nine.vercel.app',
    'http://localhost:4200'
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Serves the assets folder so images are visible online
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Database Connection - Check that this matches your Render Key!
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to Meraki Database"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

app.get('/api/cakes', async (req, res) => {
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/', (req, res) => {
    res.send("Meraki API is running successfully!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));