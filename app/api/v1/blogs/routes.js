import { Router } from "express";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
import { upload } from "../../uploadsFile/uploads.js";

/**
 * /api/v1/blogs POST - Create a new blog
 * /api/v1/blogs GET - Get all blogs
 * /api/v1/blogs/:id GET - Get a single blog
 * /api/v1/blogs/:id PUT - Update a blog
 * /api/v1/blogs/:id DELETE - Delete a blog
 */

router
  .route("/")
  .get(controller.getAll)
  .post(auth, upload.array("images"), controller.create);
router.route("/myBlogs").get(auth, controller.myBlogs);
router.route("/ping").get(controller.hacerPing);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, owner, upload.array("images"), controller.update)
  .patch(auth, owner, upload.array("images"), controller.update)
  .delete(auth, owner, controller.remove);
