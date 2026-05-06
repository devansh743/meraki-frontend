const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Cake = require('./models/Cake');
const app = express();

// 1. IMPROVED CORS: Added both current Vercel URLs and fixed the origin check
const allowedOrigins = [
    'https://meraki-frontend-theta.vercel.app',
    'https://meraki-frontend-nine.vercel.app',
    process.env.FRONTEND_URL,
    'http://localhost:4200'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// 2. ASSET SERVING: Ensuring the path is correct for Render's environment
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 3. DATABASE CONNECTION: Added common options for stability
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to Meraki Database"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

// 4. API ROUTES
app.get('/api/cakes', async (req, res) => {
    try {
        const cakes = await Cake.find({ isActive: true });
        console.log(`Found ${cakes.length} cakes in meraki collection`);
        res.json(cakes);
    } catch (error) {
        console.error("Database Fetch Error:", error.message);
        res.status(500).json({ error: "Could not fetch menu", details: error.message });
    }
});

app.get('/', (req, res) => {
    res.send("Meraki API is running successfully!");
});

// Import external routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));