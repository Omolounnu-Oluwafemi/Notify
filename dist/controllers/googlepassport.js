"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportSetup = void 0;
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = require("./../models/userModel");
dotenv_1.default.config();
// serialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// deserialize user
passport_1.default.deserializeUser(async (id, done) => {
    const _id = id;
    const currentUser = await userModel_1.User.findOne({
        _id,
    });
    done(null, currentUser);
});
const passportSetup = () => {
    passport_1.default.use(new GoogleStrategy({
        callbackURL: process.env.CALLBACK_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const googleId = profile.id;
            const email = profile.emails[0].value;
            const username = profile.name.givenName;
            const lastName = profile.name.familyName;
            const profilePhoto = profile.photos[0].value;
            //Check if user already exists in our db with the given profile ID
            const currentUser = await userModel_1.User.findOne({
                googleId: profile.id
            });
            if (currentUser) {
                //if we already have a record with the given profile ID
                done(null, currentUser);
            }
            else {
                //if not, create a new user
                const newUser = await new userModel_1.User({
                    googleId,
                    email,
                    username,
                    lastName,
                })
                    .save();
                return done(null, newUser);
            }
        }
        catch (error) {
            console.error("Error during Google OAuth authentication:", error);
            done(error, null);
        }
    }));
};
exports.passportSetup = passportSetup;
