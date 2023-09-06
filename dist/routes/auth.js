"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.SECRET_JWT;
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.post('/signup', authControllers_1.signUp);
router.post('/login', authControllers_1.login);
//google login
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/auth/google/callback", passport_1.default.authenticate("google"), (req, res) => {
    // Check if authentication failed
    if (!req.user) {
        return res.redirect("/");
    }
    // Authentication succeeded
    // Generate a JWT token
    const id = req.user._id;
    const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    return res.redirect("/dashboard");
});
router.get('/logout', authControllers_1.logout);
exports.default = router;
