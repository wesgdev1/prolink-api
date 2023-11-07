import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { fields } from "./model.js";

export const signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    // Hare una consulta para ver si el numero de documento existe en la tabla tecnico
    const result = await prisma.tecnico.findUnique({
      where: {
        numeroDocumento: body.numeroDocumento,
      },
    });

    // Si el resultado es null, quiere decir que no existe el numero de documento en la tabla tecnico
    if (result === null) {
      next({
        message:
          "No estas registrado como tecnico en el sistema, contacta al Administrador",
        status: 404,
      });
    } else {
      // creame el usuario
      const result = await prisma.usuario.create({
        data: body,
      });
      // y relaciono el usuario con el tecnico
      await prisma.tecnico.update({
        where: {
          numeroDocumento: body.numeroDocumento,
        },
        data: {
          usuario: {
            connect: {
              id: result.id,
            },
          },
        },
      });
      res.status(201);
      res.json({
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.usuario.create({
      data: body,
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  const { query = {} } = req;
  const { offset, limit } = parsePagination(query);
  const { orderBy, direction } = parseOrder({ fields, ...query });
  try {
    const [result, total] = await Promise.all([
      prisma.usuario.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
      }),
      prisma.usuario.count(),
    ]);

    res.json({
      data: result,

      meta: {
        offset,
        limit,
        total,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next) => {
  const { params = {} } = req;

  try {
    const result = await prisma.usuario.findUnique({
      where: {
        id: params.id,
      },
    });

    if (result === null) {
      next({ message: "Blog not found", status: 404 });
    } else {
      req.result = result;

      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  res.json({ data: req.result });
};

export const update = async (req, res, next) => {
  const { params = {}, body = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.usuario.update({
      where: {
        id,
      },
      data: { ...body, updatedAt: new Date().toISOString() },
    });

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, error) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.usuario.delete({
      where: {
        id,
      },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
