// backend/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // This is the most important part!
  // It creates a link to the User model.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the 'User' model we created earlier
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;