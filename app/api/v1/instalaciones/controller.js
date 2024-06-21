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

export const id = async (req, res, next, id) => {};

export const read = async (req, res, next) => {};

export const update = async (req, res, next) => {};

export const remove = async (req, res, next) => {};
