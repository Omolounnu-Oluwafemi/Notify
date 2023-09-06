"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.route('/').get(users_1.getUsers);
router.route('/:id').get(users_1.getUser).patch(users_1.updateUser).delete(users_1.deleteUser);
exports.default = router;
