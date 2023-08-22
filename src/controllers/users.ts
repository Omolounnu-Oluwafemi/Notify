import { Request, Response, NextFunction } from 'express'
import { User } from './../models/userModel';

export const getUsers = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet created',
    });
  };
  
  export const getUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is yet to be created',
    });
  };
  
  export const createUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is yet to be created',
    });
  };
  
  export const updateUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is yet to be created',
    });
  };
  
  export const deleteUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is yet to be created',
    });
  };
  