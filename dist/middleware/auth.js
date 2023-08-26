"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/* =========================== EJS MIDDLEWARE ==================*/
const jwtsecret = process.env.SECRET_JWT;
async function auth(req, res, next) {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            console.log('No token found. Redirecting to login...');
            return res.redirect('/login');
        }
        console.log('Token secret:', jwtsecret);
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            console.log('Token verification failed. Redirecting to login...');
            return res.redirect('/login');
        }
        const { id, username } = verified;
        //find user by id;
        const user = await userModel_1.User.findById({ _id: id });
        if (!user) {
            return res.redirect('/login');
        }
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
