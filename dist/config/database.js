"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const database = async () => {
    (0, dotenv_1.config)();
    try {
        const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
        await mongoose_1.default.connect(DB);
        console.log('DB connection successful!');
    }
    catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
    }
};
exports.default = database;
