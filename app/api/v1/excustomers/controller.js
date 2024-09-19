import { prisma } from "../../../database.js";
import { serviceCreate, serviceGetAll } from "./services.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await serviceGetAll();

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const result = await serviceCreate(body);

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next, id) => {
  const { params = {} } = req;

  try {
    const result = await prisma.excustomer.findUnique({
      where: {
        id: params.id,
      },
    });

    if (result === null) {
      next({ message: "service not found", status: 404 });
    } else {
      req.data = result;

      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {};

export const update = async (req, res, next) => {
  const { params = {}, body = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.excustomer.update({
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

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.excustomer.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
