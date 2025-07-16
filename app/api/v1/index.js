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
import { router as consultas } from "./consultas/routes.js";
import { router as comentarios } from "./comentarios/routes.js";
import { router as instalaciones } from "./instalaciones/routes.js";
import { router as retiros } from "./excustomers/routes.js";
import { router as barrios } from "./barrios/routes.js";
import { router as services } from "./services/routes.js";

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
router.use("/consultas", consultas);
router.use("/comentarios", comentarios);
router.use("/instalaciones", instalaciones);
router.use("/retiros", retiros);
router.use("/barrios", barrios);
router.use("/services", services);
