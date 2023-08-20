"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = require("../controllers/notes");
const router = express_1.default.Router();
/* GET All notes. */
router
    .get('/', notes_1.getNotes)
    .post('/', notes_1.createNote)
    .put('/:id', notes_1.updateNote)
    .delete('/:id', notes_1.deleteNote);
exports.default = router;
