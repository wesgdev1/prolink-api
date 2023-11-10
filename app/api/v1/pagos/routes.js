import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";

router.route("/create-order").post(controller.createOrder);
router.route("/success").get(controller.success);
router.route("/webhook").post(controller.webhook);

// router.param("id", controller.id);

// router
//   .route("/:id")
//   .get(controller.read)
//   .put(controller.update)
//   .patch(controller.update)
//   .delete(controller.remove);
