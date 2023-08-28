"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const userModel_1 = require("../models/userModel");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jwtsecret = process.env.SECRET_JWT;
const signUp = async (req, res, next) => {
    try {
        const validationResult = utils_1.registerUser.validate(req.body, utils_1.options);
        if (validationResult.error) {
            const message = validationResult.error.details.map((detail) => detail.message).join(',');
            return res.redirect('/signup?error=' + encodeURIComponent(message));
        }
        const existingUser = await userModel_1.User.findOne({ email: req.body.email });
        if (existingUser) {
            const message = 'User with that email already exists';
            return res.redirect('/signup?error=' + encodeURIComponent(message));
        }
        else {
            const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
            const newUser = new userModel_1.User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                passwordConfirm: req.body.passwordConfirm,
            });
            await newUser.save();
            const { _id } = newUser;
            // Utility function to generate token
            const generateToken = (id) => {
                return jsonwebtoken_1.default.sign({ id }, jwtsecret, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            };
            const token = generateToken(_id);
            return res.redirect("/login");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login Request Received:', email, password);
        // Validate with Joi or Zod
        const validationResult = utils_1.loginUser.validate(req.body, utils_1.options);
        if (validationResult.error) {
            console.log('Validation Error:', validationResult.error.details[0].message);
            return res.render("Login", { error: validationResult.error.details[0].message });
        }
        const user = await userModel_1.User.findOne({ email });
        if (!user) {
            console.log('User Not Found');
            return res.render("login", { error: "Invalid email/password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtsecret, { expiresIn: "30d" });
        // Set token as a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        console.log('Password:', password);
        console.log('User Password:', user.password);
        console.log('Valid User:', validUser);
        if (validUser) {
            console.log('Login Successful');
            // Redirect to root route
            return res.redirect('/dashboard');
        }
        console.log('Invalid Password');
        return res.render("login", { error: "Invalid email/password" });
    }
    catch (error) {
        console.log('Error:', error);
        res.status(500).json({ Error: "Internal server error" });
    }
};
exports.login = login;
// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   //1. Getting token and check if it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//     console.log(token);
//   }
//   if (!token) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'You are not logged in! Please log in to get access.',
//     });
//   }
//   //2. Verification token
//   try {
//     // eslint-disable-next-line no-shadow
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//   } catch (err) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Invalid token',
//     });
//   }
//   //3. Check if user still exists
//   const userExists = await User.findById(req.user);
//   if (!userExists) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'The user belonging to this token does no longer exist',
//     });
//   }
//   next();
// }   
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.redirect("/");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
