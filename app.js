// index.js
const express = require('express');
const sequelize = require('./config');
const User = require('./models/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Sequelize + Express + PostgreSQL');
});

// ყველა იუზერის ნახვა
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// ახალი იუზერის შექმნა
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DB სინქრონიზაცია და სერვერის გაშვება
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    await sequelize.sync(); // ქმნის ცხრილებს თუ არ არსებობს
    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

start();
