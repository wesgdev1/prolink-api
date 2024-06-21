import { prisma } from "../../../database.js";

export const serviceCreate = async (data) => {
  try {
    const result = await prisma.instalation.create({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const serviceGetAll = async () => {
  try {
    const result = await prisma.instalation.findMany();
    return result;
  } catch (error) {
    throw error;
  }
};
