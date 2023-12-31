import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { fields } from "./model.js";

export const create = async (req, res, next) => {
  // yo voy a recibir un Json de muchas facturas, debo insertar una por una  a la base de datos

  const { body = {} } = req;
  const { facturas } = body;
  const arregloDeFacturas = Object.values(facturas);

  arregloDeFacturas.forEach((objeto) => {
    objeto.total = parseInt(objeto.total, 10);
  });
  console.log(arregloDeFacturas);

  try {
    const result = await prisma.factura.createMany({
      data: arregloDeFacturas,
    });

    console.log(result);

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMisFacturas = async (req, res, next) => {
  const { query = {} } = req;
  const { offset, limit } = parsePagination(query);
  const { orderBy, direction } = parseOrder({ fields, ...query });
  const { decoded = {} } = req;
  const { idTipoUsuario: clienteId } = decoded;

  try {
    const [result, total] = await Promise.all([
      prisma.factura.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        where: {
          clienteId,
        },
      }),
      prisma.factura.count(),
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
      prisma.factura.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          cliente: {
            select: {
              nombreCompleto: true,
              numeroDocumento: true,
            },
          },
        },
      }),
      prisma.factura.count(),
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
    const result = await prisma.factura.findUnique({
      where: {
        id: params.id,
      },
      include: {
        pagos: true,
      },
    });

    if (result === null) {
      next({ message: "Factura not found", status: 404 });
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
    const result = await prisma.blog.update({
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
    await prisma.blog.delete({
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

export const search = async (req, res, next) => {
  const { params = {} } = req;
  const { ccClient } = params;

  try {
    const result = await prisma.factura.findMany({
      where: {
        cliente: {
          numeroDocumento: ccClient,
        },
      },
      include: {
        cliente: {
          select: {
            nombreCompleto: true,
          },
        },
      },
    });

    if (result === null) {
      next({ message: "Factura not found", status: 404 });
    } else {
      req.data = result;
      res.json({ data: result });
    }
  } catch (error) {
    next(error);
  }
};
