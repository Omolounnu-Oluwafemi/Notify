import createError from 'http-errors';
import express, { Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import dotenv from 'dotenv'
import database from './config/database';
import passport from "passport";
import session from "express-session";
import { passportSetup } from './controllers/googlepassport';

import indexRouter from './routes/index'
import usersRouter from './routes/users';
import notesRouter from './routes/notes';
import authRouter from './routes/auth'


database()
dotenv.config()
passportSetup()

const app = express();

// initialize cookie-session to allow us track the user's session
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));  
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..",'public')));

app.use('/' , [indexRouter, authRouter]);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use( function (err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
