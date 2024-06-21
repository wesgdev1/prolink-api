import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";
import { auth } from "../auth.js";
import { validateInstalationCreate } from "./model.js";
import { handleErrorsValidations } from "../middlewares.js";

router
  .route("/")
  .get(controller.getAll)
  .post(validateInstalationCreate, handleErrorsValidations, controller.create);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
