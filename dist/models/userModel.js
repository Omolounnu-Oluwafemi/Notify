"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcryptjs"));
const validation_1 = require("../utils/validation");
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
        lowercase: true,
        unique: true,
        validate: {
            //This is only going to work on CREATE and SAVE!!!
            validator: validation_1.validateEmail,
            message: 'Please provide a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        validate: {
            validator: validation_1.validatePassword,
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //This is only going to work on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
});
userSchema.pre('save', async function (next) {
    // This function will only run if password was modified
    if (!this.isModified('password'))
        return next();
    // Hash the password with cost of 10
    this.password = await bcrypt.hash(this.password, 10);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});
exports.User = mongoose_1.default.model('User', userSchema);
