const express = require('express');
const router = express.Router();
const BusinessState = require('../models/Business');
const { verifyToken } = require('../middleware/auth');

// Get all business data
router.get('/state', verifyToken, async (req, res) => {
  try {
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) {
      state = new BusinessState({ userId: req.userId });
      await state.save();
    }
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Worker
router.post('/workers', verifyToken, async (req, res) => {
  try {
    const { name, phone, area } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) state = new BusinessState({ userId: req.userId });
    
    state.workers.push({ id: Date.now(), name, phone, area });
    await state.save();
    res.json({ message: 'Worker added', worker: state.workers[state.workers.length - 1] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Bill (Transaction)
router.post('/bills', verifyToken, async (req, res) => {
  try {
    const { workerId, kg, date, dueDate, rateGovt, rateOurs, loanDeducted } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) state = new BusinessState({ userId: req.userId });

    const billValue = kg * rateGovt;
    const wePaid = kg * rateOurs;
    const cashPaid = wePaid - loanDeducted;
    const profit = kg * (rateGovt - rateOurs);

    if (cashPaid > state.cash) {
      return res.status(400).json({ message: 'Insufficient cash' });
    }

    const bill = {
      id: state.bills.length + 1,
      workerId,
      kg,
      date,
      dueDate,
      rateGovt,
      rateOurs,
      billValue,
      wePaid,
      loanDeducted,
      cashPaid,
      profit,
      status: 'pending'
    };

    state.bills.push(bill);
    state.cash -= cashPaid;

    // If loan deducted, record as repayment
    if (loanDeducted > 0) {
      state.repayments.push({
        id: Date.now(),
        workerId,
        amount: loanDeducted,
        date,
        note: `Deducted from bill #${bill.id}`
      });
    }

    // Log activity
    state.activity.unshift({
      time: new Date(),
      type: 'bill',
      worker: state.workers.find(w => w.id === workerId)?.name || 'Unknown',
      detail: `${kg} KG @ LKR ${rateGovt}/kg`,
      amount: billValue,
      cashEffect: -cashPaid
    });

    await state.save();
    res.json({ message: 'Bill recorded', bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark Bill as Paid
router.patch('/bills/:billId/pay', verifyToken, async (req, res) => {
  try {
    const { paidAmount, paidDate } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) return res.status(404).json({ message: 'Business state not found' });

    const bill = state.bills.find(b => b.id === parseInt(req.params.billId));
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.status = 'paid';
    bill.paidAmount = paidAmount;
    bill.paidDate = paidDate;
    state.cash += paidAmount;

    // Log activity
    state.activity.unshift({
      time: new Date(),
      type: 'payment',
      worker: state.workers.find(w => w.id === bill.workerId)?.name || 'Unknown',
      detail: `Bill #${bill.id} paid by govt`,
      amount: paidAmount,
      cashEffect: paidAmount
    });

    await state.save();
    res.json({ message: 'Payment recorded', bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Cash
router.post('/cash', verifyToken, async (req, res) => {
  try {
    const { amount, type, note } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) state = new BusinessState({ userId: req.userId });

    const change = type === 'add' ? amount : -amount;
    if (change < 0 && Math.abs(change) > state.cash) {
      return res.status(400).json({ message: 'Insufficient cash' });
    }

    state.cash += change;
    state.cashLogs.push({ date: new Date(), amount: change, note });

    // Log activity
    state.activity.unshift({
      time: new Date(),
      type: 'cash',
      worker: '-',
      detail: note || (type === 'add' ? 'Funds added' : 'Funds withdrawn'),
      amount: amount,
      cashEffect: change
    });

    await state.save();
    res.json({ message: 'Cash updated', cash: state.cash });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Give Loan
router.post('/loans', verifyToken, async (req, res) => {
  try {
    const { workerId, amount, date, note } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) state = new BusinessState({ userId: req.userId });

    if (amount > state.cash) {
      return res.status(400).json({ message: 'Insufficient cash for loan' });
    }

    const loan = {
      id: Date.now(),
      workerId,
      amount,
      date,
      note
    };

    state.loans.push(loan);
    state.cash -= amount;

    // Log activity
    state.activity.unshift({
      time: new Date(),
      type: 'loan',
      worker: state.workers.find(w => w.id === workerId)?.name || 'Unknown',
      detail: `Loan given${note ? ': ' + note : ''}`,
      amount: amount,
      cashEffect: -amount
    });

    await state.save();
    res.json({ message: 'Loan given', loan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Record Repayment
router.post('/repayments', verifyToken, async (req, res) => {
  try {
    const { workerId, amount, date, note } = req.body;
    let state = await BusinessState.findOne({ userId: req.userId });
    if (!state) state = new BusinessState({ userId: req.userId });

    const loanGiven = state.loans.filter(l => l.workerId === workerId).reduce((s, l) => s + l.amount, 0);
    const loanRepaid = state.repayments.filter(r => r.workerId === workerId).reduce((s, r) => s + r.amount, 0);
    const balance = loanGiven - loanRepaid;

    if (amount > balance) {
      return res.status(400).json({ message: 'Amount exceeds loan balance' });
    }

    const repayment = {
      id: Date.now(),
      workerId,
      amount,
      date,
      note
    };

    state.repayments.push(repayment);

    // Log activity
    state.activity.unshift({
      time: new Date(),
      type: 'repay',
      worker: state.workers.find(w => w.id === workerId)?.name || 'Unknown',
      detail: `Loan repayment${note ? ': ' + note : ''}`,
      amount: amount,
      cashEffect: 0
    });

    await state.save();
    res.json({ message: 'Repayment recorded', repayment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
