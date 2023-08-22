"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const userModel_1 = require("../models/userModel");
const signUp = async (req, res) => {
    try {
        const newUser = await userModel_1.User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'failure',
            message: error,
        });
    }
};
exports.signUp = signUp;
