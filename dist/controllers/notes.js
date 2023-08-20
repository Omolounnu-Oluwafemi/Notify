"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNote = void 0;
const getNote = function (req, res, next) {
    res.status(200).json({
        message: 'All notes'
    });
};
exports.getNote = getNote;
