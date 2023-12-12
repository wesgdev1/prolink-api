import { Router } from "express";
import { upload } from "../../uploadsFile/uploads.js";

// eslint-disable-next-line new-cap
export const router = Router();

import * as controller from "./controller.js";
import { auth } from "../auth.js";

/**
 * /api/v1/signin POST - Create a new blog
 * /api/v1/signip GET - Get all blogs
 * /api/v1/blogs/:id GET - Get a single blog
 * /api/v1/blogs/:id PUT - Update a blog
 * /api/v1/blogs/:id DELETE - Delete a blog
 */

router.route("/signup").post(upload.array("images"), controller.signup);
router.route("/signin").post(controller.signin);
router.route("/auth/change-password").put(auth, controller.changePassword);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, upload.array("images"), controller.update)
  .patch(auth, upload.array("images"), controller.update);
