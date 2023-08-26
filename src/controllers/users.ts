import { Request, Response, NextFunction } from 'express'
import { User } from './../models/userModel.js';

export const getUsers = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet created',
    });
  };
  
  export const getUser = (req: Request, res: Response) => {
    const user = User.findById(req.params.id);

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
  

  //Dashboard controller
export async  function dashboard(req: Request, res: Response) {  
  const usersNote = await User.findById(req.params.id);
  res.render("Dashboard", {
   usersNote
  })
}