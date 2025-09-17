// backend/server.js

// ====== IMPORTS ======
const express = require('express');
const cors = require('cors');
const { connectDB, registerUser, loginUser } = require('./db');
const todoRoutes = require('./routes/todoRoutes'); // Make sure this is imported

// ====== CONFIGURATION ======
const app = express();
const port = 3001;

// ====== DATABASE CONNECTION ======
connectDB();

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json()); // Crucial: This must be here to read req.body

// ====== API ENDPOINTS ======

// --- User Registration (Create Account) ---
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).json({ message: 'User created successfully! Please log in.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- User Login ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful!', user: loggedInUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- To-Do List Routes ---
app.use('/api/todos', todoRoutes); // Make sure this line is here

// ====== SERVER START ======
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});