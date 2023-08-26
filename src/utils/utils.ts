import Joi from "joi";

export const registerUser = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  passwordConfirm: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const loginUser = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const addMovieSchema = Joi.object().keys({
  title: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  duedate: Joi.string().required(),
  status: Joi.number().positive().required(),
});

export const updateMovieSchema = Joi.object().keys({
  title: Joi.string().lowercase(),
  description: Joi.string().lowercase(),
  duedate: Joi.string(),
  status: Joi.number().positive(),
});
