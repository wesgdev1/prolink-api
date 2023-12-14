import { prisma } from "../../../database.js";
export const createComentario = async ({ body, usuarioId, blogId }) => {
  try {
    const result = await prisma.comentario.create({
      data: { ...body, usuarioId, blogId },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
