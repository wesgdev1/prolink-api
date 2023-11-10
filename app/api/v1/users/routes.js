import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";

/**
 * /api/v1/signin POST - Create a new blog
 * /api/v1/signip GET - Get all blogs
 * /api/v1/blogs/:id GET - Get a single blog
 * /api/v1/blogs/:id PUT - Update a blog
 * /api/v1/blogs/:id DELETE - Delete a blog
 */

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
