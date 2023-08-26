import  {Schema, Document, model} from 'mongoose';
//import { validateEmail, validatePassword } from '../utils/validation';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordCreatedAt: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a Username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  },
});

// userSchema.pre('save', async function(next) {
//     // This function will only run if password was modified
//     if(!this.isModified('password')) return next();

//     // Hash the password with cost of 10
//     this.password =  await bcrypt.hash(this.password, 10);

//     // Delete passwordConfirm field
//     this.passwordConfirm = undefined
//     next();
// })

// userSchema.methods.correctPassword = function (
//   submittedPassword: string,
//   userPassword: string,
// ) {
//   return bcrypt.compareSync(submittedPassword, userPassword);
// };

export const User = model('User', userSchema);



