import express from 'express';
import { Bill } from '../models/schemas.js';

const router = express.Router();

// Get all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json({
      message: 'Bills retrieved successfully',
      data: bills
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ message: 'Error fetching bills' });
  }
});

// Get single bill
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id, userId: req.userId });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({
      message: 'Bill retrieved successfully',
      data: bill
    });
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ message: 'Error fetching bill' });
  }
});

// Create bill
router.post('/', async (req, res) => {
  try {
    const { name, amount, dueDate, category, status, description } = req.body;

    if (!name || !amount || !dueDate || !category) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const bill = new Bill({
      userId: req.userId,
      name,
      amount,
      dueDate,
      category,
      status: status || 'Pending',
      description: description || ''
    });

    await bill.save();
    res.status(201).json({
      message: 'Bill created successfully',
      data: bill
    });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ message: 'Error creating bill' });
  }
});

// Update bill
router.put('/:id', async (req, res) => {
  try {
    const { name, amount, dueDate, category, status, description } = req.body;

    const bill = await Bill.findOne({ _id: req.params.id, userId: req.userId });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    bill.name = name || bill.name;
    bill.amount = amount || bill.amount;
    bill.dueDate = dueDate || bill.dueDate;
    bill.category = category || bill.category;
    bill.status = status || bill.status;
    bill.description = description !== undefined ? description : bill.description;
    bill.updatedAt = new Date();

    await bill.save();
    res.json({
      message: 'Bill updated successfully',
      data: bill
    });
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ message: 'Error updating bill' });
  }
});

// Delete bill
router.delete('/:id', async (req, res) => {
  try {
    const bill = await Bill.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({
      message: 'Bill deleted successfully',
      data: bill
    });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(500).json({ message: 'Error deleting bill' });
  }
});

export default router;
