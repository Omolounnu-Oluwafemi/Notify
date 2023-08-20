import { Request, Response, NextFunction } from 'express';

export const getNote = function(req: Request, res: Response, next:NextFunction) {
    res.status(200).json({
        message: 'All notes'
    });
}