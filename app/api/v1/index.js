import { Router } from "express";
import { router as blogs } from "./blogs/routes.js";
import { router as users } from "./users/routes.js";
import { router as facturas } from "./facturas/routes.js";
import { router as pagos } from "./pagos/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/blogs", blogs);
router.use("/users", users);
router.use("/facturas", facturas);
router.use("/pagos", pagos);
