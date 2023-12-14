import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { uploadFiles } from "../../uploadsFile/uploads.js";
import { fields } from "./model.js";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { idTipoUsuario: tecnicoId } = decoded;
  const files = req.files;

  try {
    const promises = files.map((file) => {
      return uploadFiles(file.path);
    });
    const urlImages = await Promise.all(promises);
    console.log("urlImages", urlImages);

    const fotosCloudinary = [];
    for (let i = 0; i < files.length; i++) {
      fotosCloudinary.push({ url_foto: urlImages[i].url });
    }

    files.forEach((file) => fs.unlinkSync(file.path));

    const result = await prisma.blog.create({
      data: { ...body, tecnicoId, fotos: { create: fotosCloudinary } },
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    files.forEach((file) => fs.unlinkSync(file.path));
    next(error);
  }
};

export const myBlogs = async (req, res, next) => {
  const { query = {} } = req;
  const { offset, limit } = parsePagination(query);
  const { orderBy, direction } = parseOrder({ fields, ...query });
  const { decoded = {} } = req;
  const { idTipoUsuario: tecnicoId } = decoded;
  try {
    const [result, total] = await Promise.all([
      prisma.blog.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        where: {
          tecnicoId,
        },
        include: {
          tecnico: {
            select: {
              email: true,
              nombreCompleto: true,
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
        comentarios: {
          include: {
            usuario: {
              select: {
                email: true,
                urlFoto: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
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
  const files = req.files;

  try {
    let newData = { ...body };
    if (files?.length > 0) {
      const promises = files.map((file) => {
        return uploadFiles(file.path);
      });
      const urlImages = await Promise.all(promises);

      const fotosCloudinary = [];
      for (let i = 0; i < files.length; i++) {
        fotosCloudinary.push({ url_foto: urlImages[i].url });
      }

      files.forEach((file) => fs.unlinkSync(file.path));

      newData = {
        ...newData,
        fotos: { deleteMany: {}, create: fotosCloudinary },
      };
    }
    const result = await prisma.blog.update({
      where: {
        id,
      },
      data: { ...newData, updatedAt: new Date().toISOString() },
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
