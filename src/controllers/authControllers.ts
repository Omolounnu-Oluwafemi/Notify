import { Request, Response, NextFunction } from 'express'
import {User} from '../models/userModel';

export const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
  } catch (error) {
    res.status(400).json({
        status: 'failure',
        message: error,
      });
  }
}