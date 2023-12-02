import { prisma } from "../../../database.js";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { conversacionId } = body;
  const { id: usuarioId } = decoded;

  try {
    const mensaje = await prisma.mensaje.create({
      data: {
        ...body,
        conversacionId,
        usuarioId,
      },
    });

    res.json({
      data: mensaje,
    });
  } catch (error) {
    next(error);
  }
};
