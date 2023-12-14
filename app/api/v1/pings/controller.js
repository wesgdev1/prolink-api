import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { uploadFiles } from "../../uploadsFile/uploads.js";
import { fields } from "./model.js";
import fs from "fs";
import ping from "ping";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;

  try {
    const result = await prisma.ping.create({
      data: { ...body },
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
      prisma.blog.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          tecnico: {
            include: {
              usuario: {
                select: {
                  urlFoto: true,
                },
              },
            },
          },
          fotos: {
            select: {
              url_foto: true,
            },
          },
        },
      }),
      prisma.blog.count(),
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
    const result = await prisma.blog.findUnique({
      where: {
        id: params.id,
      },
      include: {
        fotos: {
          select: {
            url_foto: true,
          },
        },
        tecnico: {
          include: {
            usuario: {
              select: {
                urlFoto: true,
              },
            },
          },
        },
      },
    });

    if (result === null) {
      next({ message: "Blog not found", status: 404 });
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

// hacer ping a una ip que envian en la Id
// si response envia estatus 200 si no 404
// realiza el controlador para hacer ping a una ip

export const hacerPing = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const isAlive = await ping.promise.probe(id);
    if (isAlive.alive) {
      res.status(200).send({ data: { status: "Ok", time: isAlive.time } });
    } else {
      res.status(200).send({ data: { status: "Ok", time: isAlive.time } });
    }
  } catch (error) {
    next(error);
  }
};
