const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userid:     { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, index: true },
  amount:     { type: Number, required: true, min: 0 },
  type:       { type: String, enum: ['income','expense'], required: true, index: true },
  category:   { type: String, required: true },
  reference:  { type: String, default: '' },
  description:{ type: String, default: '' },
  date:       { type: Date, required: true, index: true },
}, { timestamps: true });

transactionSchema.index({ userid: 1, date: -1 });

module.exports = mongoose.model("Transactions", transactionSchema);
