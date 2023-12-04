import { prisma } from "../../../database.js";

// El creado de la conversacion siempre va a ser el usuario Cliente
export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { recipientId } = body;
  const { id: usuarioId } = decoded;

  try {
    // primero valido si el usuario ya tiene una conversacion con el admin y su estado es false, si es asi, no creo una nueva conversacion
    const conversacionExistente = await prisma.conversacion.findFirst({
      where: {
        AND: [
          {
            usuarioCliente: usuarioId,
          },
          {
            usuarioAdmin: recipientId,
          },
        ],
      },
    });

    if (conversacionExistente.estado === false) {
      return next({
        status: 400,
        message: "Ya existe una conversacion con el admin pendiente",
      });
    }
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
        usuarioA: {
          include: {
            cliente: true,
          },
        },
        usuarioB: true,

        mensajes: {
          orderBy: {
            createdAt: "asc",
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

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id: conversacionId } = params;

  try {
    const conversacion = await prisma.conversacion.update({
      where: {
        id: conversacionId,
      },
      data: {
        ...body,
      },
    });

    res.json({
      data: conversacion,
    });
  } catch (error) {
    next(error);
  }
};
