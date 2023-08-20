"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const notesModel_1 = require("../models/notesModel");
const getNotes = async function (req, res, next) {
    try {
        const notes = await notesModel_1.Note.find();
        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: {
                notes
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        });
    }
};
exports.getNotes = getNotes;
const createNote = async function (req, res, next) {
    try {
        const note = await notesModel_1.Note.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        });
    }
};
exports.createNote = createNote;
const updateNote = async function (req, res, next) {
    try {
        const updateNote = await notesModel_1.Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'note updated successfully',
            data: {
                updateNote
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        });
    }
};
exports.updateNote = updateNote;
const deleteNote = async function (req, res, next) {
    try {
        const deleteNote = await notesModel_1.Note.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Note deleted successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        });
    }
};
exports.deleteNote = deleteNote;
