import { createComentario } from "./repository.js";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: usuarioId } = decoded;
  const { blogId } = req.query;

  try {
    const result = await createComentario({ body, usuarioId, blogId });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
