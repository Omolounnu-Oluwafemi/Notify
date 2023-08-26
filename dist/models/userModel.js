"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.User = (0, mongoose_1.model)('User', userSchema);
