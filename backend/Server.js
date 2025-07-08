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

const Trip = mongoose.model('Trip', tripSchema);

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'CatchLog API is running' });
});

// GET all fish
app.get('/api/trips', async (req, res) => {
    try {
        const tripList = await Trip.find();
        res.json(tripList);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// POST new trip
app.post('/api/trips', async (req, res) => {
    try {
        if (!req.body.catches || req.body.catches.length === 0 || !req.body.catches[0].species) {
            return res.status(400).json({ msg: 'At least one catch with species is required' });
        }
        const trip = new Trip(req.body);
        const savedTrip = await trip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ msg: 'Error creating trip', error: err.message });
    }
});

// GET single Trip by ID
app.get('/api/trips/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ msg: 'Trip not found' });
        res.json(trip);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// PUT update trip
app.put('/api/trips/:id', async (req, res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTrip) return res.status(404).json({ msg: 'Trip not found' });
        res.json(updatedTrip);
    } catch (err) {
        res.status(400).json({ msg: 'Invalid ID', error: err.message });
    }
});

// DELETE trip
app.delete('/api/trips/:id', async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
        if (!deletedTrip) return res.status(404).json({ msg: 'Trip not found' });
        res.json({ msg: 'Trip deleted successfully' });
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
            'GET /api/trips',
            'POST /api/trips',
            'GET /api/trips/:id',
            'PUT /api/trips/:id',
            'DELETE /api/trips/:id'
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