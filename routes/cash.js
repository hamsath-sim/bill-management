import express from 'express';
import { Cash } from '../models/schemas.js';

const router = express.Router();

// Get all cash records
router.get('/', async (req, res) => {
  try {
    const cash = await Cash.find({ userId: req.userId }).sort({ date: -1 });
    res.json({
      message: 'Cash records retrieved successfully',
      data: cash
    });
  } catch (error) {
    console.error('Error fetching cash records:', error);
    res.status(500).json({ message: 'Error fetching cash records' });
  }
});

// Get single cash record
router.get('/:id', async (req, res) => {
  try {
    const cash = await Cash.findOne({ _id: req.params.id, userId: req.userId });
    if (!cash) {
      return res.status(404).json({ message: 'Cash record not found' });
    }
    res.json({
      message: 'Cash record retrieved successfully',
      data: cash
    });
  } catch (error) {
    console.error('Error fetching cash record:', error);
    res.status(500).json({ message: 'Error fetching cash record' });
  }
});

// Create cash record
router.post('/', async (req, res) => {
  try {
    const { amount, date, description } = req.body;

    if (!amount || !date || !description) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const cash = new Cash({
      userId: req.userId,
      amount,
      date,
      description
    });

    await cash.save();
    res.status(201).json({
      message: 'Cash record created successfully',
      data: cash
    });
  } catch (error) {
    console.error('Error creating cash record:', error);
    res.status(500).json({ message: 'Error creating cash record' });
  }
});

// Update cash record
router.put('/:id', async (req, res) => {
  try {
    const { amount, date, description } = req.body;

    const cash = await Cash.findOne({ _id: req.params.id, userId: req.userId });
    if (!cash) {
      return res.status(404).json({ message: 'Cash record not found' });
    }

    cash.amount = amount || cash.amount;
    cash.date = date || cash.date;
    cash.description = description || cash.description;

    await cash.save();
    res.json({
      message: 'Cash record updated successfully',
      data: cash
    });
  } catch (error) {
    console.error('Error updating cash record:', error);
    res.status(500).json({ message: 'Error updating cash record' });
  }
});

// Delete cash record
router.delete('/:id', async (req, res) => {
  try {
    const cash = await Cash.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!cash) {
      return res.status(404).json({ message: 'Cash record not found' });
    }
    res.json({
      message: 'Cash record deleted successfully',
      data: cash
    });
  } catch (error) {
    console.error('Error deleting cash record:', error);
    res.status(500).json({ message: 'Error deleting cash record' });
  }
});

export default router;
