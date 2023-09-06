/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import jwt, {Secret} from 'jsonwebtoken';

const jwtsecret: Secret = process.env.SECRET_JWT as Secret;
import { signUp, login, logout } from '../controllers/authControllers';

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);
//google login

router.get( "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

router.get("/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // Check if authentication failed
      if (!req.user) {
        return res.redirect("/"); 
      }
      // Authentication succeeded
      // Generate a JWT token
      const id = req.user._id;
     
      const token = jwt.sign({id }, jwtsecret, { expiresIn: "30d" });
      // Set token as a cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
      return res.redirect("/dashboard");
    }
  );
router.get('/logout', logout)

export default router;
