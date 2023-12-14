import { prisma } from "../../../database.js";
import { parsePagination, parseOrder } from "../../../uutils.js";

import mercadopago from "mercadopago";

export const createOrder = async (req, res, next) => {
  const { body = {} } = req;

  mercadopago.configure({
    access_token:
      "TEST-4961418933233703-110911-7c4418d69d53c10b92f97eaa2a74493e-1541567495",
  });

  console.log("ref en el create", body.idReferencia);

  const result = await mercadopago.preferences.create({
    external_reference: body.idReferencia,
    items: [
      {
        title: body.referencia + "-" + body.descripcion,

        unit_price: body.valor,
        currency_id: "COP",
        quantity: 1,
      },
    ],

    back_urls: {
      success: `${process.env.WEB_URL}/success?ref=${body.idReferencia}`,
      failure: `${process.env.WEB_URL}/error`,
      pending: `${process.env.WEB_URL}/error`,
    },
    notification_url: `${process.env.API_HTTPS_URL}/api/v1/pagos/webhook`,
  });

  res.send(result.body.init_point);
  res.status(201);
};

export const success = async (req, res, next) => {
  res.send("sucess");
};

export const webhook = async (req, res, next) => {
  console.log(req.query);

  // valido que el pago se realizo correctamente
  try {
    const payment = req.query;

    if (payment.type === "payment") {
      // console.log("pago realizado, espero promesa");
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("dataP", data);
      console.log("id del pago", data.body.id.toString()),
        console.log("metodo de pago", data.body.payment_method.type);
      console.log("ACTUALIZO el campo estado de la tabla factura");
      // actualizo el campo estado de la tabla factura

      if (data.body.status === "approved" && data.status === 200) {
        const result = await prisma.factura.update({
          where: {
            id: data.body.external_reference,
          },
          data: {
            estado: true,
          },
        });

        if (result) {
          const result2 = await prisma.pago.create({
            data: {
              referenciaPago: data.body.id.toString(),
              facturaId: data.body.external_reference,
            },
          });
        }
      } else {
        const result = await prisma.factura.update({
          where: {
            id: data.body.external_reference,
          },
          data: {
            estado: false,
          },
        });
      }
    }

    res.status(200).send("Ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// CONTraslash
