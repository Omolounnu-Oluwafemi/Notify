import { Request, Response, NextFunction } from 'express'

export const signUp = function(req: Request, res: Response, next: NextFunction) {
    res.status(201).json({
        message: 'User created'
    })
  }