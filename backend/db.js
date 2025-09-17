require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- DATABASE CONNECTION ---
// We wrap this in a function to be called from server.js
const connectDB = async () => {
 try {
    // This will now correctly read the MONGO_URI from your .env file
    const mongoURI = process.env.MONGO_URI; 
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully via db.js');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// --- SCHEMA AND MODEL ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// --- DATABASE FUNCTIONS ---

// Function to handle user registration
const registerUser = async (username, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Throwing an error here will be caught by the catch block in server.js
    throw new Error('User with this email already exists.');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save the new user
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

// Function to handle user login
const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials.');
  }

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }
  
  return { id: user._id, email: user.email,  username: user.username};
};

// --- EXPORTS ---
// We export the connection function and the database interaction functions
module.exports = {
  connectDB,
  registerUser,
  loginUser,
};