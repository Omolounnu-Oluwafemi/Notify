import express, { Request, Response} from 'express';
import { auth } from '../middleware/auth';
import { Note } from '../models/notesModel';

const router = express.Router();


/* GET home page. */
// /
router.get('/', function(req, res, next) {
  res.render("index")
});

// /register
router.get('/signUp', function(req, res, next) {
  res.render("signup")
});

// /login
router.get('/login', function(req, res, next) {
  res.render("login")
});

// /about
router.get('/about', function(req, res, next) {
  res.render("About")
});

// Navigate to create page
router.get('/createPage', auth, (req, res) => {
  res.render('createPage');
});

//get dashboard
router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;

    const user = res.locals.user; // Get the user details from res.locals

    const note = await Note.find({ userId: verified.id });

    return res.render("dashboard", { note, user }); // Pass user details to the view

  } catch (error) {
    console.log(error);
  }
});


  // create Note
  router.post("/createNote", auth, async (req: Request | any, res:Response) => {   
    try {
      const { title, description, dueDate, status } = req.body;

        console.log('Raw dueDate:', dueDate);

        // Convert the dueDate string to a Date object
        const parsedDueDate = new Date(dueDate);

        console.log('Parsed dueDate:', parsedDueDate);

        const verified = req.user;

        const note = new Note({
          title,
          description,
          dueDate: parsedDueDate,
          status,
          userId: verified.id
        });
  
         await note.save()

       return res.redirect("/createPage")
      
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" });
    }
  });

  // Get request to update Note
  router.get("/editNote/:id", auth, async (req: Request | any, res: Response) => {
    try {
      const note = await Note.findById(req.params.id);
      res.render("updatePage", { note });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });

// Get request to update Note
  router.get("/deleteNote/:id", auth, async (req: Request | any, res: Response) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });
// // Handle 404
// router.get('*', function(req, res) {
//   res.status(404).render("404")
// })





export default router;

