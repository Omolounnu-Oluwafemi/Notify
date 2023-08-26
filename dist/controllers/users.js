"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const userModel_js_1 = require("./../models/userModel.js");
const getUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet created',
    });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const user = userModel_js_1.User.findById(req.params.id);
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be created',
    });
};
exports.getUser = getUser;
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be created',
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be created',
    });
};
exports.deleteUser = deleteUser;
//Dashboard controller
async function dashboard(req, res) {
    const usersNote = await userModel_js_1.User.findById(req.params.id);
    res.render("Dashboard", {
        usersNote
    });
}
exports.dashboard = dashboard;
