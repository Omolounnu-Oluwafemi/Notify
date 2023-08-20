"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: [true, 'A user must have a firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'A user must have a lastname'],
    },
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
        // primaryKey: true,
    },
    email: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'A user must have a username'],
    },
});
exports.User = mongoose_1.default.model('User', userSchema);
// User.hasMany( Note, {
//     foreignKey: 'userId'
// })
// Note.belongsTo(User, {
//     foreignKey: 'userId'
// })
