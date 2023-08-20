import { Request, Response, NextFunction } from 'express';
import { Note } from '../models/notesModel';

export const getNotes = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const notes = await Note.find();
            res.status(200).json({
                status: 'success',
                results: notes.length,
                data: {
                        notes
                    }
            });
        } catch (error) {
            res.status(400).json({
            status: 'Failure',
            message: error,
          });
        }
    }

export const createNote = async function(req: Request, res: Response, next:NextFunction) {

    try {
        const note = await Note.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
            note
        }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
          });
    }
}
export const updateNote = async function(req: Request, res: Response, next:NextFunction) {
    try {
        const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          })
            res.status(200).json({
                status:'note updated successfully',
                data: {
                updateNote
                }
            })
        } catch (error) {
            res.status(400).json({
                status: 'Failure',
                message: error,
            });
    }
}

export const deleteNote = async function(req: Request, res: Response, next:NextFunction) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Note deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failure',
            message: error,
        })
    }
   
}