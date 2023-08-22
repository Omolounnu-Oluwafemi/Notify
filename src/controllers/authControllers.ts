import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import { ObjectId } from 'mongoose';

const signToken = (id: ObjectId) =>{
 return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export const signUp = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      });
  } catch (error:any) {
    let message = 'error signing up user';
    if (error.name === 'ValidationError') {
      message = Object.values(error.errors).map((err: any) => err.message).join(', ');
    } else if (req.body.email === User.email) {
      message = 'User with that email already exists';
    }
    res.status(400).json({
        status: 'failure',
        message,
      });
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //1.  Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password!',
    });
  }

  //2.  Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  //3. If everything ok, send token to client

  const token = signToken(user._id);

  res.status(200).json({
    status: 'successfully logged in',
    token,
  });
};

