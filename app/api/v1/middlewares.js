import { validationResult } from "express-validator";

export const handleErrorsValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ message: errors.array(), status: 400 });
  } else {
    next();
  }
};
