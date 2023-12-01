import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { message, transporter } from "../mailer.js";
import { fields } from "./model.js";
import fs from "fs";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;

  try {
    const result = await prisma.soporteTecnico.create({
      data: { ...body },
    });

    const info = await transporter.sendMail(message);

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSoportesoftheDay = async (req, res, next) => {
  try {
    const result = await prisma.soporteTecnico.findMany({
      where: {
        fechaGeneracion: new Date().toISOString().split("T")[0],
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMySoportes = async (req, res, next) => {
  const { query = {} } = req;
  const { offset, limit } = parsePagination(query);
  const { orderBy, direction } = parseOrder({ fields, ...query });
  const { decoded = {} } = req;
  const { idTipoUsuario, tipoUsuario } = decoded;
  const where = {};

  if (tipoUsuario === "Cliente") {
    const clienteId = idTipoUsuario;
    where.clienteId = clienteId;
  } else {
    const tecnicoId = idTipoUsuario;
    where.tecnicoId = tecnicoId;
  }

  try {
    const [result, total] = await Promise.all([
      prisma.soporteTecnico.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        where,
        include: {
          cliente: {
            select: {
              nombreCompleto: true,
              email: true,
            },
          },
        },
      }),
      prisma.soporteTecnico.count(),
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

export const getAll = async (req, res, next) => {
  const { query = {} } = req;
  const { offset, limit } = parsePagination(query);
  const { orderBy, direction } = parseOrder({ fields, ...query });
  try {
    const [result, total] = await Promise.all([
      prisma.soporteTecnico.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          cliente: {
            select: {
              nombreCompleto: true,
              email: true,
            },
          },
        },
      }),
      prisma.soporteTecnico.count(),
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
    const result = await prisma.soporteTecnico.findUnique({
      where: {
        id: params.id,
      },

      include: {
        cliente: {
          select: {
            nombreCompleto: true,
            email: true,
            direccion: true,
            servicio: true,
            telefono: true,
            ipNavegacion: true,
          },
        },
        tecnico: {
          select: {
            nombreCompleto: true,
          },
        },
      },
    });

    if (result === null) {
      next({ message: "soporte not found", status: 404 });
    } else {
      req.data = result;

      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  res.json({ data: req.data });
};

export const update = async (req, res, next) => {
  const { params = {}, body = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.soporteTecnico.update({
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
    await prisma.tecnico.delete({
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
