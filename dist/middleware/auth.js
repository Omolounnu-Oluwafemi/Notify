"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
/* =========================== EJS MIDDLEWARE ==================*/
const jwtsecret = process.env.SECRET_JWT;
async function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('No token found. Redirecting to login...');
            return res.redirect('/login');
        }
        const { id, email } = jsonwebtoken_1.default.decode(token);
        //find user by id;
        // Convert the 'id' string to a valid ObjectId
        const userId = new mongoose_1.default.Types.ObjectId(id);
        // Find the user by the converted ObjectId
        const user = await userModel_1.User.findOne({ _id: userId });
        if (!user) {
            return res.redirect('/login');
        }
        const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        req.user = verified;
        res.locals.user = user;
        next();
    }
    catch (err) {
        console.log('Error:', err);
        return res.redirect('/login');
    }
}
exports.auth = auth;
