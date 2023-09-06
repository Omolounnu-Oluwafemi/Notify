import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import  { User } from "../models/userModel";
import { config } from 'dotenv';
import mongoose from "mongoose";

config()

/* =========================== EJS MIDDLEWARE ==================*/

const jwtsecret: Secret = process.env.SECRET_JWT as Secret;
export async function auth(req: Request | any, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log('No token found. Redirecting to login...');
      return res.redirect('/login');
    }

    const { id, email } = jwt.decode(token) as { [key: string]: string };
    //find user by id;
    // Convert the 'id' string to a valid ObjectId
    const userId = new mongoose.Types.ObjectId(id);

    // Find the user by the converted ObjectId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.redirect('/login');
    }

    const verified = jwt.verify(token, jwtsecret);

    req.user = verified;
    res.locals.user = user;

    next();

  } catch (err) {
    console.log('Error:', err);
    return res.redirect('/login');
  }
}
  
