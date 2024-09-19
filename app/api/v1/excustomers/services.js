import { prisma } from "../../../database.js";

export const serviceCreate = async (data) => {
  try {
    const result = await prisma.excustomer.create({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const serviceGetAll = async () => {
  try {
    const result = await prisma.excustomer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
