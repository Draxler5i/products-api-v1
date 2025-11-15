const express = require('express');
const cors = require('cors');
const { connectDB, disconnectDB } = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/v1/health', (req, res) => {
  res.status(200).json({ message: 'API running' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

