const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const moment = require("moment");

router.post("/add-transaction", async function (req, res) {
  try {
    const payload = { ...req.body };
    const userId = req.userId || payload.userid;
    if (!userId) return res.status(400).json("Missing userid");
    payload.userid = userId;
    if (payload.amount != null) payload.amount = Number(payload.amount);
    const newtransaction = new Transaction(payload);
    await newtransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    const { transactionId, payload } = req.body;
    if (payload && payload.amount != null) payload.amount = Number(payload.amount);
    await Transaction.findOneAndUpdate({ _id: transactionId }, payload);
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Transaction Deleted Successfully");
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

router.post("/get-all-transactions", async function (req, res) {
  try {
    const { frequency, selectedRange, type } = req.body;
    const userId = req.userId || req.body.userid;
    if (!userId) return res.status(400).json("Missing userid");

    // Build date filter
    let dateFilter = {};
    if (frequency && frequency !== 'custom') {
      dateFilter = {
        date: {
          $gt: moment().subtract(Number(frequency), "d").toDate(),
        },
      };
    } else if (frequency === 'custom' && Array.isArray(selectedRange) && selectedRange.length === 2) {
      dateFilter = {
        date: {
          $gte: selectedRange[0],
          $lte: selectedRange[1],
        },
      };
    }

    const query = {
      userid: userId,
      ...dateFilter,
      ...(type !== 'all' && type ? { type } : {}),
    };

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

module.exports = router;
