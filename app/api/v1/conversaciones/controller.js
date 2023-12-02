import { prisma } from "../../../database.js";

// El creado de la conversacion siempre va a ser el usuario Cliente
export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { recipientId } = body;
  const { id: usuarioId } = decoded;

  try {
    const conversacion = await prisma.conversacion.create({
      data: {
        usuarioCliente: usuarioId,
        usuarioAdmin: recipientId,
      },
    });

    res.json({
      data: conversacion,
    });
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: usuarioId } = decoded;

  try {
    const conversaciones = await prisma.conversacion.findMany({
      where: {
        OR: [
          {
            usuarioCliente: usuarioId,
          },
          {
            usuarioAdmin: usuarioId,
          },
        ],
      },
      include: {
        usuarioA: true,
        usuarioB: true,
      },
    });

    res.json({
      data: conversaciones,
    });
  } catch (error) {
    next(error);
  }
};

export const get = async (req, res, next) => {
  const { params = {}, decoded = {} } = req;
  const { id: conversacionId } = params;
  const { id: usuarioId } = decoded;

  try {
    const conversacion = await prisma.conversacion.findFirst({
      where: {
        AND: [
          {
            id: conversacionId,
          },
          {
            OR: [
              {
                usuarioCliente: usuarioId,
              },
              {
                usuarioAdmin: usuarioId,
              },
            ],
          },
        ],
      },
      include: {
        usuarioA: true,
        usuarioB: true,

        mensajes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.json({
      data: conversacion,
    });
  } catch (error) {
    next(error);
  }
};
