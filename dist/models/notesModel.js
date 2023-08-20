"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'A note must have a title'],
        trim: true,
    },
    description: {
        type: String,
        default: 'My note description'
    },
    DueDate: {
        type: String,
        required: [true, 'A note must have a dueDate'],
    },
    status: {
        type: String,
        required: [true, 'A note must have a status'],
    },
});
exports.Note = mongoose_1.default.model('Note', noteSchema);
