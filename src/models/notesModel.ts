import mongoose from "mongoose";


const noteSchema = new mongoose.Schema(
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
    DueDate: {
            type: String,
            required: [true, 'A note must have a dueDate'],
        },
    status: {
            type: String,
            required: [true, 'A note must have a status'],
            enum: {
                values: ['Yet to started', 'started', 'Completed'],
                message: 'Difficulty level can either be Yet to started, started or Completed',
              },
        },
    },
);

export const Note = mongoose.model('Note', noteSchema);



