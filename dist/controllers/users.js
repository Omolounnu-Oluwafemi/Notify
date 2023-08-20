"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const signUp = function (req, res, next) {
    res.status(201).json({
        message: 'User created'
    });
};
exports.signUp = signUp;
