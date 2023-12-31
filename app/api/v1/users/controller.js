import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";
import { uploadFiles } from "../../uploadsFile/uploads.js";
import { signToken } from "../auth.js";
import { encryptPassword, verifyPassword } from "../blogs/model.js";
import { fields } from "./model.js";
import fs from "fs";

export const signup = async (req, res, next) => {
  const { body = {} } = req;
  const files = req.files;

  try {
    if (body.tipoUsuario === "Tecnico") {
      // Hare una consulta para ver si el numero de documento existe en la tabla tecnico
      const result = await prisma.tecnico.findUnique({
        where: {
          numeroDocumento: body.numeroDocumento,
        },
      });

      // Si el resultado es null, quiere decir que no existe el numero de documento en la tabla tecnico
      if (result === null) {
        next({
          message:
            "No estas registrado como tecnico en el sistema, contacta al Administrador",
          status: 404,
        });
      } else {
        // creame el usuario y creo la relacion con el tecnico
        const promises = files.map((file) => {
          return uploadFiles(file.path);
        });
        const urlImages = await Promise.all(promises);

        const fotosCloudinary = [];
        for (let i = 0; i < files.length; i++) {
          fotosCloudinary.push({ url_foto: urlImages[i].url });
        }

        files.forEach((file) => fs.unlinkSync(file.path));
        const password = await encryptPassword(body.password);

        const result = await prisma.usuario.create({
          data: {
            ...body,
            password,
            urlFoto: urlImages[0]?.url,

            tecnico: {
              connect: {
                numeroDocumento: body.numeroDocumento,
              },
            },
          },
          select: {
            id: true,
            email: true,
            tipoUsuario: true,
            tecnico: {
              select: {
                id: true,
              },
            },
          },
        });

        res.status(201);
        res.json({
          data: result,
        });
      }
    } else if (body.tipoUsuario === "Cliente") {
      // Hare una consulta para ver si el numero de documento existe en la tabla tecnico
      const result = await prisma.cliente.findUnique({
        where: {
          numeroDocumento: body.numeroDocumento,
        },
      });

      // Si el resultado es null, quiere decir que no existe el numero de documento en la tabla tecnico
      if (result === null) {
        next({
          message:
            "No estas registrado como tecnico en el sistema, contacta al Administrador",
          status: 404,
        });
      } else {
        // creame el usuario y creo la relacion con el tecnico
        const promises = files.map((file) => {
          return uploadFiles(file.path);
        });
        const urlImages = await Promise.all(promises);

        const fotosCloudinary = [];
        for (let i = 0; i < files.length; i++) {
          fotosCloudinary.push({ url_foto: urlImages[i].url });
        }

        files.forEach((file) => fs.unlinkSync(file.path));

        const password = await encryptPassword(body.password);

        const result = await prisma.usuario.create({
          data: {
            ...body,
            password,
            urlFoto: urlImages[0]?.url,

            cliente: {
              connect: {
                numeroDocumento: body.numeroDocumento,
              },
            },
          },
          select: {
            id: true,
            email: true,
            tipoUsuario: true,
            tecnico: {
              select: {
                id: true,
              },
            },
          },
        });

        res.status(201);
        res.json({
          data: result,
        });
      }
    } else {
      const password = await encryptPassword(body.password);

      const result = await prisma.usuario.create({
        data: {
          ...body,
          password,
        },
        select: {
          id: true,
          email: true,
          tipoUsuario: true,
        },
      });

      res.status(201);
      res.json({
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email, password } = body;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        tipoUsuario: true,
        urlFoto: true,
        tecnico: {
          select: {
            id: true,
            nombreCompleto: true,
          },
        },
        cliente: {
          select: {
            id: true,
            nombreCompleto: true,
          },
        },
      },
    });
    console.log(user);

    if (user === null) {
      return next({ message: "Correo o contraseña incorrecto", status: 403 });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({ message: "Correo o contraseña incorrecto", status: 403 });
    }

    const token = signToken({
      id: user.id,
      tipoUsuario: user.tipoUsuario,

      idTipoUsuario:
        user.tipoUsuario === "Admin"
          ? null
          : user.tecnico
          ? user.tecnico.id
          : user.cliente.id,
    });

    res.json({
      data: { ...user, password: undefined },
      meta: {
        token,
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
      prisma.usuario.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
      }),
      prisma.usuario.count(),
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
    const result = await prisma.usuario.findUnique({
      where: {
        id: params.id,
      },
    });

    if (result === null) {
      next({ message: "User not found", status: 404 });
    } else {
      req.result = result;

      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  res.json({ data: req.result });
};

export const update = async (req, res, next) => {
  const { params = {}, body = {} } = req;
  const { id } = params;
  const files = req.files;

  try {
    const promises = files.map((file) => {
      return uploadFiles(file.path);
    });
    const urlImages = await Promise.all(promises);

    const result = await prisma.usuario.update({
      where: {
        id,
      },
      data: { urlFoto: urlImages[0]?.url, updatedAt: new Date().toISOString() },
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
    await prisma.usuario.delete({
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

export const changePassword = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = decoded;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const passwordMatch = await verifyPassword(body.password, user.password);

    if (!passwordMatch) {
      return next({ message: "Contraseña incorrecta", status: 400 });
    }

    const newPassword = await encryptPassword(body.newPassword);

    const result = await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};
