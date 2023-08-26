import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import  { User } from "../models/userModel";
import { config } from 'dotenv';

config()

/* =========================== EJS MIDDLEWARE ==================*/

const jwtsecret: Secret = process.env.SECRET_JWT as Secret;
export async function auth(req: Request | any, res: Response, next: NextFunction) {
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
      console.log('No token found. Redirecting to login...');
      return res.redirect('/login');
    }

    console.log('Token secret:', jwtsecret);
    let verified = jwt.verify(authorization, jwtsecret);
    

    if (!verified) {
      console.log('Token verification failed. Redirecting to login...');
      return res.redirect('/login');
    }

    const { id, username } = verified as { [key: string]: string };

       //find user by id;
       const user = await User.findById({_id:id})
  
       if(!user){
        return res.redirect('/login')
       }
    
       req.user = verified
       res.locals.user = user;

    next();

  } catch (err) {
    console.log('Error:', err);
    return res.redirect('/login');
  }
}
