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
      }).render('signup', {
        message
  });
};
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

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  //1. Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.',
    });
  }

  //2. Verification token
  try {
    // eslint-disable-next-line no-shadow
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }

  //3. Check if user still exists
  const userExists = await User.findById(req.user);
  if (!userExists) {
    return res.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token does no longer exist',
    });
  }

  // //4. Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return res.status(401).json({
  //     status: 'fail',
  //     message: 'User recently changed password! Please log in again.',
  //   });
  // }

  // //GRANT ACCESS TO PROTECTED ROUTE
  // req.user = currentUser;
  next();
}