const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  name: { type: String, required: true },
  phone: String,
  area: String,
  createdAt: { type: Date, default: Date.now }
});

const billSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  workerId: { type: Number, required: true },
  kg: { type: Number, required: true },
  date: String,
  dueDate: String,
  rateGovt: { type: Number, default: 10 },
  rateOurs: { type: Number, default: 9 },
  billValue: Number,
  wePaid: Number,
  loanDeducted: { type: Number, default: 0 },
  cashPaid: Number,
  profit: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paidAmount: Number,
  paidDate: String,
  createdAt: { type: Date, default: Date.now }
});

const loanSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  workerId: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: String,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

const repaymentSchema = new mongoose.Schema({
  id: { type: Number, default: () => Date.now() },
  workerId: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: String,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

const activitySchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  type: String,
  worker: String,
  detail: String,
  amount: Number,
  cashEffect: Number
});

const businessStateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  cash: { type: Number, default: 0 },
  workers: [workerSchema],
  bills: [billSchema],
  loans: [loanSchema],
  repayments: [repaymentSchema],
  activity: [activitySchema],
  cashLogs: [{
    date: Date,
    amount: Number,
    note: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusinessState', businessStateSchema);
