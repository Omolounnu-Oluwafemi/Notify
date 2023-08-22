"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const users_js_1 = require("../controllers/users.js");
const authControllers_js_1 = require("../controllers/authControllers.js");
const router = express_1.default.Router();
router.post('/signup', authControllers_js_1.signUp);
router.route('/').get(users_js_1.getUsers).post(users_js_1.createUser);
router.route('/:id').get(users_js_1.getUser).patch(users_js_1.updateUser).delete(users_js_1.deleteUser);
exports.default = router;
