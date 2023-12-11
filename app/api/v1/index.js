import { Router } from "express";
import { router as blogs } from "./blogs/routes.js";
import { router as users } from "./users/routes.js";
import { router as facturas } from "./facturas/routes.js";
import { router as pagos } from "./pagos/routes.js";
import { router as tecnicos } from "./tecnicos/routes.js";
import { router as clientes } from "./clientes/routes.js";
import { router as soportes } from "./soportes/routes.js";
import { router as mensajes } from "./mensajes/routes.js";
import { router as conversaciones } from "./conversaciones/routes.js";
import { router as pings } from "./pings/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/blogs", blogs);
router.use("/users", users);
router.use("/facturas", facturas);
router.use("/pagos", pagos);
router.use("/tecnicos", tecnicos);
router.use("/clientes", clientes);
router.use("/soportes", soportes);
router.use("/mensajes", mensajes);
router.use("/conversaciones", conversaciones);
router.use("/pings", pings);
