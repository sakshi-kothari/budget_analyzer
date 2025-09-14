const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI is not set');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo DB connected'))
  .catch((err) => {
    console.error('Mongo error:', err);
    process.exit(1);
  });

module.exports = mongoose.connection;
