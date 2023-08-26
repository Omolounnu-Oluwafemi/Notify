"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.addMovieSchema = exports.loginUser = exports.options = exports.registerUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUser = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    passwordConfirm: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.loginUser = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.addMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    duedate: joi_1.default.string().required(),
    status: joi_1.default.number().positive().required(),
});
exports.updateMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    description: joi_1.default.string().lowercase(),
    duedate: joi_1.default.string(),
    status: joi_1.default.number().positive(),
});
