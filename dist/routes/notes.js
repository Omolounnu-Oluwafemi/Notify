"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = require("./../controllers/notes");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/').get(auth_1.auth, notes_1.getNotes);
router
    .post('/create', notes_1.createNote)
    .put('/:id', notes_1.updateNote)
    .delete('/:id', notes_1.deleteNote);
exports.default = router;
