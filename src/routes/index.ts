import express from 'express';

const router = express.Router();


/* GET home page. */
// /
router.get('/', function(req, res, next) {
  res.render("Home")
});

// /register
router.get('/signUp', function(req, res, next) {
  res.render("signup")
});

// /login
router.get('/login', function(req, res, next) {
  res.render("Login")
});

// /about
router.get('/about', function(req, res, next) {
  res.render("About")
});


// // Handle 404
// router.get('*', function(req, res) {
//   res.status(404).render("404")
// })





export default router;

