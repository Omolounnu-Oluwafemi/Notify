"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'A note must have a title'],
        trim: true,
    },
    description: {
        type: String,
        default: 'My note description'
    },
    dueDate: {
        type: Date,
        required: [true, 'A note must have a dueDate'],
    },
    status: {
        type: String,
        required: [true, 'A note must have a status'],
        enum: {
            values: ['Pending', 'In Progress', 'Completed'],
            message: 'status level can either be Pending, In progress or Completed',
        },
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
exports.Note = (0, mongoose_1.model)('Note', noteSchema);
