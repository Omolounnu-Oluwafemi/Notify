"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    lastname: {
        type: String,
        required: [true, 'Please tell us your last name'],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
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
exports.User = mongoose_1.default.model('User', userSchema);
