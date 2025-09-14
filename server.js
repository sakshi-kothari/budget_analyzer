require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Connect DB
require('./dbConnect');

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Routes
const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute');
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionsRoute);

const port = process.env.PORT || 5000;

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  console.log('ENTRY');
  app.use('/', express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));
