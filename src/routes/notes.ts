import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notes';
import { protect } from '../controllers/authControllers';
import { auth } from '../middleware/auth';


const router = express.Router();


router.route('/').get( auth , getNotes)

router
// .get('/', protect, getNotes)
.post('/create', createNote)
.put('/:id', updateNote)
.delete('/:id', deleteNote);

export default router; 