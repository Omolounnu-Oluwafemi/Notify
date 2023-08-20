import { Request, Response, NextFunction } from 'express'
import { User } from './../models/userModel';

export const signUp = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'User created',
            data: {
            user
        }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
          });
    }
  }

export const Login = async function(req: Request, res: Response, next: NextFunction) {
//  try {
//     const user = await User.find
//        res.status(200).json({
//            message: 'User logged in'
//        })
//  } catch (error) {
    
//  }
  }