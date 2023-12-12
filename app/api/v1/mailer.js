import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mensajeSoporte = ({ emailCliente, mensaje }) => {
  return {
    from: "Prolink Comunicaciones",
    to: `${emailCliente}`,
    subject: `Asignación de soporte # ${mensaje.numeroSoporte}`,
    text: `Asignación de soporte # ${mensaje.numeroSoporte}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
            h1{ font-size: 30px !important;}
            h2{ font-size: 25px !important;}
            h3{ font-size: 18px !important;}
            h4{ font-size: 16px !important;}
            p, a{font-size: 15px !important;}
    
            .claseBoton{
                width: 30%;
                    background-color: #71bbfb;
                    border: 2px solid #71bbfb;
                    color: black; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
            }
            .claseBoton:hover{
                background-color: #000000;
                color: #ffffff;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
            .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13px !important;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; background-color: #e3e3e3;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                    <img src="https://res.cloudinary.com/dppqkypts/image/upload/v1702156223/Dise%C3%B1o_sin_t%C3%ADtulo_17_cz79tt.png" alt="" style="width: 60px; height: 60px;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido principal -->
                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                    <h1>¡Hola, ${mensaje.cliente.nombreCompleto} !</h1>
                    <h2>Hemos generado un soporte tenico para tu servicio en:</h2>
                    <h2>${mensaje.cliente.direccion}</h2>

                    <h3>Detalles del soporte</h3>
                    <table style="margin: auto; border-collapse: collapse; width: 80%; text-align: center;">
                        <thead>
                        <tr>
                            <th style="border: 1px solid #dddddd; padding: 8px;">Tecnico</th>
                            <th style="border: 1px solid #dddddd; padding: 8px;">Fecha</th>
                            <th style="border: 1px solid #dddddd; padding: 8px;">Hora</th>
                        </tr>
                        </thead>
                        <tbody>
                 
                        <tr>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${mensaje.tecnico.nombreCompleto}</td>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${mensaje.fechaGeneracion}</td>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${mensaje.horaGeneracion}</td>
                        </tr>
                        <!-- Puedes agregar más filas según sea necesario -->
                        </tbody>
                    </table>
                                    
    
                    <!-- Gracias -->
                    <p>Si tienes alguna novedad informarlo en nuestra aplicacion</p>
                    <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Prolink</p>
    
                    <!-- Botón -->
                    <a class="claseBoton" href="https://www.pretwor.com/">Prolink</a>
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                   
                    <h4>Soporte</h4>
                    <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                        Comunícate con nosotros por los siguientes medios:<br>
                        Correo: <a class="afooter" href="mailto:prolinkcomunicaciones@gmail.com">prolinkcomunicaciones@gmail.com</a><br>
                        Whatsapp: <a class="afooter" href="https://wa.me/573122821189">+57 312 282 1189</a><br>
                    </p>
                    <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                        © 2023 ProLink, todos los derechos reservados.
                    </p>
                </div>
                <!-- Footer -->
    
    
    
            </div>
        </div>
    </body>
    </html>`,
  };
};

export const crearMensaje = ({ email }) => {
  return {
    from: "Prolink Comunicaciones",
    to: `${email}`,
    subject: "¡Bienvenido!",
    text: "Bienvenido a Prolink Comunicaciones",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
            h1{ font-size: 30px !important;}
            h2{ font-size: 25px !important;}
            h3{ font-size: 18px !important;}
            h4{ font-size: 16px !important;}
            p, a{font-size: 15px !important;}
    
            .claseBoton{
                width: 30%;
                    background-color: #71bbfb;
                    border: 2px solid #71bbfb;
                    color: black; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
            }
            .claseBoton:hover{
                background-color: #000000;
                color: #ffffff;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
            .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13px !important;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; background-color: #e3e3e3;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                    <img src="https://res.cloudinary.com/dppqkypts/image/upload/v1701892888/ADMIN_1_neh0va.png" alt="" style="width: 60px; height: 60px;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido principal -->
                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                    <h1>Bienvenido a Prolink Comunicaciones</h1>
                    <p>
                      
                      Hola, por favor ingresa a nuestra plataforma y crea tu usuario para que puedas disfrutar de todos los beneficios que tenemos para ti.
                    </p>
    
                    <!-- Gracias -->
                    <p>Gracias por tu tiempo.</p>
                    <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Prolink</p>
    
                    <!-- Botón -->
                    <a class="claseBoton" href="https://www.pretwor.com/">Prolink</a>
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                   
                    <h4>Soporte</h4>
                    <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                        Comunícate con nosotros por los siguientes medios:<br>
                        Correo: <a class="afooter" href="mailto:prolinkcomunicaciones@gmail.com">prolinkcomunicaciones@gmail.com</a><br>
                        Whatsapp: <a class="afooter" href="https://wa.me/573122821189">+57 312 282 1189</a><br>
                    </p>
                    <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                        © 2023 ProLink, todos los derechos reservados.
                    </p>
                </div>
                <!-- Footer -->
    
    
    
            </div>
        </div>
    </body>
    </html>`,
  };
};

export const message = {
  from: "Prolink Comunicaciones",
  to: "willienn@hotmail.com",
  subject: "¡Bienvenido!",
  text: "Bienvenido a Prolink Comunicaciones",
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <style>
          p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
          h1{ font-size: 30px !important;}
          h2{ font-size: 25px !important;}
          h3{ font-size: 18px !important;}
          h4{ font-size: 16px !important;}
          p, a{font-size: 15px !important;}
  
          .claseBoton{
              width: 30%;
                  background-color: #71bbfb;
                  border: 2px solid #71bbfb;
                  color: black; 
                  padding: 16px 32px;
                  text-align: center;
                  text-decoration: none;
                  font-weight: bold;
                  display: inline-block;
                  font-size: 16px;
                  margin: 4px 2px;
                  transition-duration: 0.4s;
                  cursor: pointer;
          }
          .claseBoton:hover{
              background-color: #000000;
              color: #ffffff;
          }
          .imag{
              width: 20px;
              height: 20px;
          }
          .contA{
              margin: 0px 5px 0 5px;
          }
          .afooter{
              color: #ffffff !important; 
              text-decoration: none;
              font-size: 13px !important;
          }
      </style>
  </head>
  <body>
      <div style="width: 100%; background-color: #e3e3e3;">
          <div style="padding: 20px 10px 20px 10px;">
              <!-- Imagen inicial -->
              <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                  <img src="https://res.cloudinary.com/dppqkypts/image/upload/v1701892888/ADMIN_1_neh0va.png" alt="" style="width: 60px; height: 60px;">
              </div>
              <!-- Imagen inicial -->
  
              <!-- Contenido principal -->
              <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                  <h1>Bienvenido a Prolink Comunicaciones</h1>
                  <p>
                    
                    Hola, por favor ingresa a nuestra plataforma y crea tu usuario para que puedas disfrutar de todos los beneficios que tenemos para ti.
                  </p>
  
                  <!-- Gracias -->
                  <p>Gracias por tu tiempo.</p>
                  <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Prolink</p>
  
                  <!-- Botón -->
                  <a class="claseBoton" href="https://www.pretwor.com/">Prolink</a>
              </div>
              <!-- Contenido principal -->
  
              <!-- Footer -->
              <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                 
                  <h4>Soporte</h4>
                  <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                      Comunícate con nosotros por los siguientes medios:<br>
                      Correo: <a class="afooter" href="mailto:prolinkcomunicaciones@gmail.com">prolinkcomunicaciones@gmail.com</a><br>
                      Whatsapp: <a class="afooter" href="https://wa.me/573122821189">+57 312 282 1189</a><br>
                  </p>
                  <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                      © 2023 ProLink, todos los derechos reservados.
                  </p>
              </div>
              <!-- Footer -->
  
  
  
          </div>
      </div>
  </body>
  </html>`,
};
