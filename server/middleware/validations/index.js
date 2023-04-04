import { body, validationResult } from "express-validator";
import fs from "fs/promises";

const registerValidation = () => {
  return [
    body("fullname", "Name must contain at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Valid email is required").isEmail(),
    body("phone", "Valid phone number is required").isMobilePhone(),
    body("bio", "Bio must contain at least 10 characters").isLength({
      min: 10,
    }),
    body("profession", "Profession cannot be empty").notEmpty(),
    body("password", "Password must contain at least 7 characters").isLength({
      min: 7,
    }),

    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),
  ];
};

const loginValidation = () => {
  return [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must contain at least 7 characters").isLength({
      min: 7,
    }),
  ];
};

const editUserValidation = () => {
  return [
    body("fullname", "Name must contain at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Valid email is required").isEmail(),
    body("phone", "Valid phone number is required").isMobilePhone(),
    body("bio", "Bio must contain at least 10 characters").isLength({
      min: 10,
    }),
    body("profession", "Profession cannot be empty").notEmpty(),
  ];
};

const addEventValidation = () => {
  return [
    body("title", "Title must contain at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must contain at least 10 characters"
    ).isLength({ min: 10 }),
    body("date", "Date cannot be empty").notEmpty(),
    body("entry", "Please specify the type of entry").notEmpty(),
  ];
};

const taskValidation = () => {
  return [
    body("task_name", "Task name must contain at least 5 characters").isLength({
      min: 5,
    }),
    body("description", "Description cannot be empty").notEmpty(),
    body("deadline", "Deadline is required").notEmpty(),
  ];
};

const postValidation = () =>{
  return [
    body("title", "Title must contain at least 3 characters").isLength({min: 3}),
    body("body", "Post body must contain at least 10 characters").isLength({min: 10})
  ]
}

const errorMiddleware = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.file && await fs.unlink(`assets/${req.file.filename}`)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  registerValidation,
  errorMiddleware,
  loginValidation,
  editUserValidation,
  taskValidation,
  addEventValidation,
  postValidation
};
