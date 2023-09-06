import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express'
import jwt, {Secret} from 'jsonwebtoken';
import { registerUser, options, loginUser } from "../utils/utils";
import {User} from '../models/userModel';
import { Types } from 'mongoose';
import { config } from 'dotenv';

config()

const jwtsecret: Secret = process.env.SECRET_JWT as Secret;
   // Utility function to generate token
   const generateToken = (id: Types.ObjectId): string => {
    return jwt.sign({ id }, jwtsecret, {
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    });
  }

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = registerUser.validate(req.body, options);

    if (validationResult.error) {
      const message = validationResult.error.details.map((detail) => detail.message).join(',');
      return res.redirect('/signup?error=' + encodeURIComponent(message));
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const message = 'User with that email already exists';
      return res.redirect('/signup?error=' + encodeURIComponent(message));
    } else {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        passwordConfirm: req.body.passwordConfirm,
      });

      await newUser.save();

      const { _id } = newUser;

      const token: string = generateToken(_id);

      return res.redirect("/login")
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('Login Request Received:', email, password);

    // Validate with Joi or Zod
    const validationResult = loginUser.validate(req.body, options);

    if (validationResult.error) {
      console.log('Validation Error:', validationResult.error.details[0].message);
      return res.render("Login", { error: validationResult.error.details[0].message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User Not Found');
      return res.render("login", { error: "Invalid email/password" });
    }
    const { _id } = user;
     // const token = jwt.sign({ id: user._id }, jwtsecret, { expiresIn: "30d" });
      const token: string = generateToken(_id);
      // Set token as a cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

      const validUser = await bcrypt.compare(password, user?.password || "");
  
       console.log('Password:', password);
        console.log('User Password:', user.password);
        console.log('Valid User:', validUser);

    if (validUser) {
      console.log('Login Successful');
      // Redirect to root route
      return res.redirect('/dashboard');
    } 

      console.log('Invalid Password');
      return res.render("login", { error: "Invalid email/password" });


  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   //1. Getting token and check if it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//     console.log(token);
//   }

//   if (!token) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'You are not logged in! Please log in to get access.',
//     });
//   }

//   //2. Verification token
//   try {
//     // eslint-disable-next-line no-shadow
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//   } catch (err) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Invalid token',
//     });
//   }

//   //3. Check if user still exists
//   const userExists = await User.findById(req.user);
//   if (!userExists) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'The user belonging to this token does no longer exist',
//     });
//   }
//   next();
// }   

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
