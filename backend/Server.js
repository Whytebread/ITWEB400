const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CatchLog')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Mongo Error:', err));

// Trip Schema
const tripSchema = new mongoose.Schema({
    bodyOfWater: String,
    weather: String,
    temperature: String,
    catchDate: Date,
    notes: String,
        catches: [
            {
                species: String,
                length: Number,
                weight: Number,
                bait: String
            }
        ]
}, { timestamps: true });

const Fish = mongoose.model('Trip', tripSchema);

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Fish Tracker API is running' });
});

// GET all fish
app.get('/api/catchlog', async (req, res) => {
    try {
        const fishList = await Fish.find();
        res.json(fishList);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// POST new fish
app.post('/api/catchlog', async (req, res) => {
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
app.get('/api/catchlog/:id', async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id);
        if (!fish) return res.status(404).json({ msg: 'Fish not found' });
        res.json(fish);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// PUT update fish
app.put('/api/catchlog/:id', async (req, res) => {
    try {
        const updatedFish = await Fish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFish) return res.status(404).json({ msg: 'Fish not found' });
        res.json(updatedFish);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// DELETE fish
app.delete('/api/catchlog/:id', async (req, res) => {
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
        message: 'CatchLog API', 
        endpoints: [
            'GET /api/health',
            'GET /api/catchlog',
            'POST /api/catchlog',
            'GET /api/catchlog/:id',
            'PUT /api/catchlog/:id',
            'DELETE /api/catchlog/:id'
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