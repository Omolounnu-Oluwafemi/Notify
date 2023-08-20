"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.signUp = void 0;
const userModel_1 = require("./../models/userModel");
const signUp = async function (req, res, next) {
    try {
        const user = await userModel_1.User.create(req.body);
        res.status(200).json({
            status: 'User created',
            data: {
                user
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        });
    }
};
exports.signUp = signUp;
const Login = async function (req, res, next) {
    //  try {
    //     const user = await User.find
    //        res.status(200).json({
    //            message: 'User logged in'
    //        })
    //  } catch (error) {
    //  }
};
exports.Login = Login;
