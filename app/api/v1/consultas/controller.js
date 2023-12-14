import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { mensajeSoporte, transporter } from "../mailer.js";
import { fields } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.consultas.create({
      data: { ...body, telefono: body.telefono.toString() },
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
      prisma.consultas.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        where: {
          estado: false,
        },
      }),
      prisma.consultas.count(),
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
    const result = await prisma.consultas.findUnique({
      where: {
        id: params.id,
      },
    });

    if (result === null) {
      next({ message: "consulta not found", status: 404 });
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
    const result = await prisma.consultas.update({
      where: {
        id,
      },
      data: { ...body },
    });

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};
