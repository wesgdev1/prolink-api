import { Router } from "express";
import { router as blogs } from "./blogs/routes.js";
import { router as users } from "./users/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/blogs", blogs);
router.use("/users", users);
