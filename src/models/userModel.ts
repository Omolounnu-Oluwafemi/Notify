import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please tell us your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

export const User = mongoose.model('User', userSchema);
