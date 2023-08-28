"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const authControllers_js_1 = require("../controllers/authControllers.js");
const router = express_1.default.Router();
router.post('/signup', authControllers_js_1.signUp);
router.post('/login', authControllers_js_1.login);
router.get('/logout', authControllers_js_1.logout);
exports.default = router;
