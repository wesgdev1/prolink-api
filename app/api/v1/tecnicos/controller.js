import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { crearMensaje, transporter } from "../mailer.js";
import { fields } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await prisma.tecnico.create({
      data: { ...body },
    });
    const { email } = result;
    const mensaje = crearMensaje({ email });
    await transporter.sendMail(mensaje);

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
      prisma.tecnico.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          soportesTecnicos: {
            include: {
              cliente: {
                select: {
                  nombreCompleto: true,
                },
              },
            },
          },
        },
      }),
      prisma.tecnico.count(),
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
    const result = await prisma.tecnico.findUnique({
      where: {
        id: params.id,
      },
    });

    if (result === null) {
      next({ message: "tecnico not found", status: 404 });
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
    const result = await prisma.tecnico.update({
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
