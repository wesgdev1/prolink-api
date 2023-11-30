import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";

/**
 * /api/v1/blogs POST - Create a new blog
 * /api/v1/blogs GET - Get all blogs
 * /api/v1/blogs/:id GET - Get a single blog
 * /api/v1/blogs/:id PUT - Update a blog
 * /api/v1/blogs/:id DELETE - Delete a blog
 */

router.route("/").get(controller.getAll).post(auth, controller.create);
router.route("/search/:ccClient").get(controller.search);
router.route("/myFacturas").get(auth, controller.getMisFacturas);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
