const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fishtracker')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Mongo Error:', err));

// Fish Schema
const fishSchema = new mongoose.Schema({
    species: String,
    size: Number,     // in inches or cm
    weight: Number,   // in pounds or kg
    location: String,
    weather: String,
    dateTime: Date,
    miscNotes: String
}, { timestamps: true });

const Fish = mongoose.model('Fish', fishSchema);

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Fish Tracker API is running' });
});

// GET all fish
app.get('/api/fish', async (req, res) => {
    try {
        const fishList = await Fish.find();
        res.json(fishList);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// POST new fish
app.post('/api/fish', async (req, res) => {
    try {
        if (!req.body.species) {
            return res.status(400).json({ msg: 'Species is required' });
        }
        const fish = new Fish(req.body);
        const savedFish = await fish.save();
        res.status(201).json(savedFish);
    } catch (err) {
        res.status(400).json({ msg: 'Error creating fish', error: err.message });
    }
});

// GET single fish by ID
app.get('/api/fish/:id', async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id);
        if (!fish) return res.status(404).json({ msg: 'Fish not found' });
        res.json(fish);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// PUT update fish
app.put('/api/fish/:id', async (req, res) => {
    try {
        const updatedFish = await Fish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFish) return res.status(404).json({ msg: 'Fish not found' });
        res.json(updatedFish);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// DELETE fish
app.delete('/api/fish/:id', async (req, res) => {
    try {
        const deletedFish = await Fish.findByIdAndDelete(req.params.id);
        if (!deletedFish) return res.status(404).json({ msg: 'Fish not found' });
        res.json({ msg: 'Fish deleted successfully' });
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Fish Tracker API', 
        endpoints: [
            'GET /api/health',
            'GET /api/fish',
            'POST /api/fish',
            'GET /api/fish/:id',
            'PUT /api/fish/:id',
            'DELETE /api/fish/:id'
        ]
    });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} in use. Try another port.`);
    } else {
        console.error('Server error:', err);
    }
});
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));