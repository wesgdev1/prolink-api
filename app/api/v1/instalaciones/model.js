// quiero validar los campos con express validator

import { body } from "express-validator";

export const validateInstalationCreate = [
  body("nameClient").isString().withMessage("El nombre es requerido"),
  body("address").isString().withMessage("La dirección es requerida"),
  body("phone").isString().withMessage("El teléfono es requerido"),
  body("email").isString().optional().withMessage("El email es requerido"),
  body("ubication")
    .isString()
    .optional()
    .withMessage("El servicio es requerido"),
];
