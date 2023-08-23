import  {Schema, Document, model} from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { validateEmail, validatePassword } from '../utils/validation';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide your first name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please provide your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    lowercase: true,
    unique: true,
    validate: {
        //This is only going to work on CREATE and SAVE!!!
        validator: validateEmail,
        message: 'Please provide a valid email address',
      },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
        validator: validatePassword,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
        //This is only going to work on CREATE and SAVE!!!
        validator: function (el: any) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
  },
});

userSchema.pre('save', function(next) {
    // This function will only run if password was modified
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 10
    this.password =  bcrypt.hash(this.password, 10);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined
    next();
})

userSchema.methods.correctPassword = function (
  submittedPassword: string,
  userPassword: string,
) {
  return bcrypt.compareSync(submittedPassword, userPassword);
};



export const User = model('User', userSchema);


