import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import dotenv from "dotenv";
import { User } from "./../models/userModel";

dotenv.config();

// serialize user
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id: any, done:any) => {
  const _id = id;
  const currentUser = await User.findOne({
    _id,
  });
  done(null, currentUser);
});

export const passportSetup = () => {
passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
            const googleId= profile.id;
            const email = profile.emails[0].value;
            const username = profile.name.givenName;
            const lastName = profile.name.familyName;
            const profilePhoto = profile.photos[0].value;

          //Check if user already exists in our db with the given profile ID
            const currentUser = await User.findOne({
               googleId: profile.id 
            });
            if (currentUser) {
              //if we already have a record with the given profile ID
              done(null, currentUser);
            } else {       
               //if not, create a new user
              const newUser = await new User({
                googleId,
                email,
                username,
                lastName,
              })
              .save();
              return done(null, newUser);
            }
          } catch (error) {
            console.error("Error during Google OAuth authentication:", error);
            done(error, null);
          }
    
    }
  )
)};
