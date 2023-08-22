"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
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
        unique: true,
        lowercase: true,
        validate: {
            //This is only going to work on CREATE and SAVE!!!
            validator: function (el) {
                return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(el);
            },
            message: 'Please provide a valid email address',
        },
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
userSchema.pre('save', async function (next) {
    // This function will only run if password was modified
    if (!this.isModified('password'))
        return next();
    // Hash the password with cost of 12
    this.password = await bcrypt_1.default.hash(this.password, 12);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});
exports.User = mongoose_1.default.model('User', userSchema);
