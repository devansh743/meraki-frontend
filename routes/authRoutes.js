const express = require('express');
const router = express.Router();

// A simple but secure way to check access without a full User Database
router.post('/login', (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Devu_@28';

    if (password === ADMIN_PASSWORD) {
        // In a full MEAN stack, you'd send a JWT token here
        res.status(200).json({ authenticated: true });
    } else {
        res.status(401).json({ authenticated: false, message: 'Invalid Credentials' });
    }
});

module.exports = router;