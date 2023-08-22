"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = void 0;
function validateEmail(el) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(el);
}
exports.validateEmail = validateEmail;
function validatePassword(el) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(el);
}
exports.validatePassword = validatePassword;
