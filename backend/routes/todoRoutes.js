// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Import our new Todo model

// GET all todos for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.params.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (create) a new todo
router.post('/', async (req, res) => {
  const { text, userId } = req.body;
  const todo = new Todo({
    text: text,
    user: userId,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a todo's completion status
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.completed = !todo.completed; // Toggle the status
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await todo.deleteOne();
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;