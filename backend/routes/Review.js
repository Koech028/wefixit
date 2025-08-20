const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Submit a review (client)
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Review submitted and awaiting approval.' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Get all reviews (admin use)
router.get('/all', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Approve a review
router.patch('/:id/approve', async (req, res) => {
    try {
        const updated = await Review.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

