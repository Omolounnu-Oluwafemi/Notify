import {Document, Schema, model} from 'mongoose'
import { IUser } from './userModel';

export interface INote extends Document{
    title: string;
    description: string;
    dueDate: string;
    status: string;
    userId: IUser | any;
}

const noteSchema = new Schema(
    {
    title:{
            type: String,
            required: [true, 'A note must have a title'],
            trim: true,
        },
    description: {
            type: String,
            default: 'My note description'
        },
    dueDate: {
            type: Date,
            required: [true, 'A note must have a dueDate'],
        },
    status: {
            type: String,
            required: [true, 'A note must have a status'],
            enum: {
                values: ['Pending', 'In Progress', 'Completed'],
                message: 'status level can either be Pending, In progress or Completed',
              },
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
    },
);

export const Note = model <INote>('Note', noteSchema);



