"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const signUp = async (req, res) => {
    try {
        const newUser = await userModel_1.User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            },
        });
    }
    catch (error) {
        let message = 'error signing up user';
        if (error.name === 'ValidationError') {
            message = Object.values(error.errors).map((err) => err.message).join(', ');
        }
        else if (req.body.email === userModel_1.User.email) {
            message = 'User with that email already exists';
        }
        res.status(400).json({
            status: 'failure',
            message,
        });
    }
};
exports.signUp = signUp;
