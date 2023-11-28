import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";
import { auth } from "../auth.js";

router.route("/").get(controller.getAll).post(auth, controller.create);
router.route("/mySoportes").get(auth, controller.getMySoportes);
router.route("/soportesDia").get(auth, controller.getSoportesoftheDay);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
