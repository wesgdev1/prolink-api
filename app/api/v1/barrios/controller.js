import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { crearMensaje, transporter } from "../mailer.js";
import { fields } from "./model.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await prisma.barrio.findMany({
      orderBy: {
        nombre: "asc",
      },
      select: {
        id: true,
        nombre: true,
      },
    });
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
