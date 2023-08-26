"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const testUtils_1 = require("./testUtils");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const noteModel_1 = __importDefault(require("../../model/noteModel"));
(0, globals_1.beforeAll)(async () => await (0, testUtils_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, testUtils_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            fullname: "Samuel",
            email: "Samuel@gmail.com",
            password: "123456",
            gender: "male",
            phone: "+2348165789842",
            address: "No 22 Kingsway, Oslo",
        };
        const newUserData = new userModel_1.default(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.fullname).toBe(UserData.fullname);
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
        (0, globals_2.expect)(newUserData.gender).toBe(UserData.gender);
        (0, globals_2.expect)(newUserData.phone).toBe(UserData.phone);
        (0, globals_2.expect)(newUserData.address).toBe(UserData.address);
    });
    (0, globals_1.test)("should fail for User data without email field", async () => {
        var _a;
        const invalidUserData = {
            email: "Samuel@gmail.com",
            password: "123456",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)((_a = err.errors) === null || _a === void 0 ? void 0 : _a.email).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without fullname and password fields", async () => {
        var _a, _b;
        const invalidUserData = {
            fullname: "Samuel",
            password: "123456",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)((_a = err.errors) === null || _a === void 0 ? void 0 : _a.fullname).toBeDefined();
            (0, globals_2.expect)((_b = err.errors) === null || _b === void 0 ? void 0 : _b.password).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without firstname field", async () => {
        var _a, _b;
        const invalidUserData = {
            email: "samuel@gmail.com",
            fullname: "Samuel",
            password: "123456",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)((_a = err.errors) === null || _a === void 0 ? void 0 : _a.fullname).toBeDefined();
            (0, globals_2.expect)((_b = err.errors) === null || _b === void 0 ? void 0 : _b.email).toBeUndefined();
        }
    });
});
(0, globals_1.describe)("Note Model Test Suite", () => {
    (0, globals_1.test)("should create a Note data successfully", async () => {
        const NoteData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        const newNoteData = new noteModel_1.default({
            userId: new mongoose_1.default.Types.ObjectId(NoteData.userId),
            title: NoteData.title,
            description: NoteData.description,
            duedate: NoteData.duedate,
            status: NoteData.status,
        });
        await newNoteData.save();
        (0, globals_2.expect)(newNoteData._id).toBeDefined();
        (0, globals_2.expect)(newNoteData.userId).toEqual(NoteData.userId);
        (0, globals_2.expect)(newNoteData.title).toEqual(NoteData.title);
        (0, globals_2.expect)(newNoteData.description).toEqual(NoteData.description);
        (0, globals_2.expect)(newNoteData.duedate).toEqual(NoteData.duedate);
        (0, globals_2.expect)(newNoteData.status).toEqual(NoteData.status);
    });
    (0, globals_1.test)("should fail for Note data without required fields", async () => {
        const invalidNoteData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        try {
            const newNoteData = new noteModel_1.default(invalidNoteData);
            await newNoteData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.userId).toBeDefined();
        }
    });
    (0, globals_1.test)("should update a Note successfully", async () => {
        const newNoteData = {
            userId: new mongoose_1.default.Types.ObjectId(),
            title: "The Walking Dead",
            description: "A thrilling TV show",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        const createdNote = await noteModel_1.default.create(newNoteData);
        const updatedData = {
            title: "The Walking Dead - Updated",
            description: "Updated description",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        const updatedNote = await noteModel_1.default.findByIdAndUpdate(createdNote._id, updatedData, { new: true });
        (0, globals_2.expect)(updatedNote).not.toBeNull();
        (0, globals_2.expect)(updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.userId).toEqual(newNoteData.userId);
        (0, globals_2.expect)(updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.title).toEqual(updatedData.title);
        (0, globals_2.expect)(updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.description).toEqual(updatedData.description);
        (0, globals_2.expect)(updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.duedate).toEqual(updatedData.duedate);
        (0, globals_2.expect)(updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.status).toEqual(updatedData.status);
    });
    (0, globals_1.test)("should fail to update a non-existent Note", async () => {
        const nonExistentNoteId = new mongoose_1.default.Types.ObjectId();
        const updatedData = {
            title: "The Walking Dead - Updated",
            description: "Updated description",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        const updatedNote = await noteModel_1.default.findByIdAndUpdate(nonExistentNoteId, updatedData);
        (0, globals_2.expect)(updatedNote).toBeNull();
    });
    (0, globals_1.test)("should delete a Note successfully", async () => {
        const NoteData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "The Walking Dead",
            description: "It is very Interesting",
            duedate: "25th December, 2023",
            status: "success | pending",
        };
        const newNoteData = new noteModel_1.default({
            userId: new mongoose_1.default.Types.ObjectId(NoteData.userId),
            title: NoteData.title,
            description: NoteData.description,
            duedate: NoteData.duedate,
            status: NoteData.status,
        });
        await newNoteData.save();
        const deleteResult = await noteModel_1.default.deleteOne({ _id: newNoteData._id });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(1);
    });
    (0, globals_1.test)("should fail to delete a non-existent Note", async () => {
        const nonExistentNoteId = new mongoose_1.default.Types.ObjectId();
        const deleteResult = await noteModel_1.default.deleteOne({ _id: nonExistentNoteId });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(0);
    });
});
