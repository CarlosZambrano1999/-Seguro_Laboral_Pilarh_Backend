//Requerimos el paquete
const nodemailer = require('nodemailer');
require('dotenv').config({path:'./.env'});
const env = process.env;

var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: env.EMAIL,
    pass: env.EM_PASSWORD
  }
});

/*var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "141d8e880a9fbc",
    pass: "4f1e1b7c9a34f8"
  }
});*/

async function mailBienvenida(user){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: `${user.correo}`,
      subject: `Bienvenido al Sistema de encomiendas de PILARH`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola ${user.nombre}!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Bienvenido al sistema de encomiendas de PILARH-OPDF</p>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Ahora puedes <strong>Tener acceso a los envíos y recibos de paquetes de tu agencia</strong></p>
                          <br>
                          <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Tendrás acceso a</h2>
                              <ol style="padding-left:15px;font-size:14px;margin:0">
                              <li style="padding-bottom:10px">
                                  <p style="font-size:14px;padding-bottom:10px;margin:0">Notificar las encomiendas realizadas por tu agencia.</p>
                                  <ul style="padding-left:15px;font-size:14px;margin:0">
                                  <li style="padding-bottom:10px">Podrás especificar los datos del transportista y su unidad. </li>
                                  <li style="padding-bottom:10px">La fecha en que se realizo el envio a su vez una fecha estimada de llegada.</li>
                                  <li style="padding-bottom:10px">Describir de manera segura el porque de tu envío.</li>
                                  </ul>
                              </li>
                              <li style="padding-bottom:10px">
                                  <p style="font-size:14px;padding-bottom:10px;margin:0">Acceso a los paquetes enviados</p>
                                  <ul style="padding-left:15px;font-size:14px;margin:0">
                                  <li style="padding-bottom:10px">Podrás ver el historial de los paquetes enviados por tu agencia.</li>
                                  <li style="padding-bottom:10px">Podrás vigilar el estado de dichas encomiendas, para verificar su recibimiento.</li>
                                  </ul>
                              </li>
                              <li style="padding-bottom:10px">
                                  <p style="font-size:14px;padding-bottom:10px;margin:0">Acceso a los paquetes recibidos</p>
                                  <ul style="padding-left:15px;font-size:14px;margin:0">
                                  <li style="padding-bottom:10px">Podrás ver el historial de los paquetes recibidos dirigidos a tu agencia.</li>
                                  <li style="padding-bottom:10px">Podrás validar una encomienda para estar pendiente de su recibimiento y a su vez confirmar su llegada.</li>
                                  </ul>
                              </li>
                              </ol>
                              <br>
                              <br>
                              <br>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}


async function mailNuevaEncomienda(correos, encom){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: correos,
      subject: `Encomienda para: ${ encom.recibe } de: ${ encom.envia} ${encom.fecha_envio}`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Hay una nueva encomienda dirigida para tu agencia en ${encom.recibe}</p>
                          <br>
                          <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Datos de encomienda</h2>
                          <div>
                            <p> <b>De:</b> ${ encom.envia }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_emisora}</p>
                            <p> <b>Para:</b> ${ encom.recibe }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_receptora}</p>
                            <p> <b>Enviado por:</b> ${ encom.emisor }; <i>${encom.correo_emisor}</i></p>
                            <p> <b>Empresa:</b> ${ encom.empresa }</p>
                            <p> <b>Chofer:</b> ${ encom.chofer }</p>
                            <p> <b>#Teléfono del Chofer:</b> ${ encom.telefono_chofer }</p>
                            <p> <b>Descripción de transporte:</b> ${ encom.descripcion_transporte }</p>
                            <p> <b>Fecha y hora de salida:</b> ${ encom.fecha_envio } ${ encom.hora_envio }</p>
                            <p> <b>Fecha y hora de llegada:</b> ${ encom.fecha_llegada } ${ encom.hora_llegada }</p>
                            <p> <b>Descripción:</b> ${ encom.descripcion }</p>
                          </div>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <p>Para ver y validar la encomienda haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/received">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}

async function mailEncomiendaEditada(correos, encom){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: correos,
      subject: `Encomienda para: ${ encom.recibe } de: ${ encom.envia} ${encom.fecha_envio}`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                            <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola!</h1>
                            <p style="font-size:14px;padding-bottom:10px;margin:0">La encomienda con código ${encom.codigo_encomienda} dirigida para tu agencia en ${encom.recibe} ha sido editada por su emisor</p>
                            <p style="font-size:14px;padding-bottom:10px;margin:0">Estos son los nuevos cambios: </p>
                            <br>
                            <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Datos de encomienda</h2>
                            <div>
                              <p> <b>De:</b> ${ encom.envia }</p>
                              <p> <b>Telefono:</b> ${encom.telefono_emisora}</p>
                              <p> <b>Para:</b> ${ encom.recibe }</p>
                              <p> <b>Telefono:</b> ${encom.telefono_receptora}</p>
                              <p> <b>Enviado por:</b> ${ encom.emisor }; <i>${encom.correo_emisor}</i></p>
                              <p> <b>Empresa:</b> ${ encom.empresa }</p>
                              <p> <b>Chofer:</b> ${ encom.chofer }</p>
                              <p> <b>#Teléfono del Chofer:</b> ${ encom.telefono_chofer }</p>
                              <p> <b>Descripción de transporte:</b> ${ encom.descripcion_transporte }</p>
                              <p> <b>Fecha y hora de salida:</b> ${ encom.fecha_envio } ${ encom.hora_envio }</p>
                              <p> <b>Fecha y hora de llegada:</b> ${ encom.fecha_llegada } ${ encom.hora_llegada }</p>
                              <p> <b>Descripcion: </b>${ encom.descripcion }</p>
                            </div>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <p>Para ver y validar la encomienda haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/received">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}

async function mailResetEncomienda(correos, encom){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: correos,
      subject: `Encomienda para: ${ encom.recibe } de: ${ encom.envia} ${encom.fecha_envio}`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                            <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola!</h1>
                            <p style="font-size:14px;padding-bottom:10px;margin:0">La encomienda con código ${encom.codigo_encomienda} dirigida para tu agencia en ${encom.recibe} ha sido editada por su emisor</p>
                            <p style="font-size:14px;padding-bottom:10px;margin:0">Al parecer la encomienda ha cambiado de agencia de destino, por lo que ha sido redirigida</p>
                            <br>
                            <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Por lo que ya no aparecerá en tus encomiendas recibidas</h2>
                        
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <p>Para verificar que la encomienda desapareció de tus encomiendas recibidas haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/received">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}


async function mailEncomiendaValidada(encom){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: encom.correo_emisor,
      subject: `Tu encomienda enviada a ${encom.recibe} ${encom.fecha_envio} ha sido validada`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola ${encom.emisor}!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Ya hay alguien pendiente de la encomienda con código ${encom.codigo_encomienda} que enviaste a ${encom.recibe}</p>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Mira los datos de la persona a cargo de recibir y confirmar tu encomienda </p>
                          <br>
                          <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Datos de encomienda</h2>
                          <div>
                            <p> <b>De:</b> ${ encom.envia }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_emisora}</p>
                            <p> <b>Para:</b> ${ encom.recibe }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_receptora}</p>
                            <p> <b>Enviado por:</b> ${ encom.emisor }; <i>${encom.correo_emisor}</i></p>
                            <p> <b>Atendido por:</b> ${ encom.receptor }; <i>${encom.correo_receptor}</i></p>
                            <p> <b>Empresa:</b> ${ encom.empresa }</p>
                            <p> <b>Chofer:</b> ${ encom.chofer }</p>
                            <p> <b>#Teléfono del Chofer:</b> ${ encom.telefono_chofer }</p>
                            <p> <b>Descripción de transporte:</b> ${ encom.descripcion_transporte }</p>
                            <p> <b>Fecha y hora de salida:</b> ${ encom.fecha_envio } ${ encom.hora_envio }</p>
                            <p> <b>Fecha y hora de llegada:</b> ${ encom.fecha_llegada } ${ encom.hora_llegada }</p>
                            <p> <b>Descripción:</b>${ encom.descripcion }</p>
                          </div>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <p>Para ver mas detalles haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/sent">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}

async function mailEncomiendaConfirmada(encom){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: encom.correo_emisor,
      subject: `Tu encomienda enviada a ${encom.recibe} ${encom.fecha_envio} llego con éxito`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola ${encom.emisor}!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Ya recibieron exitosamente la encomienda con código ${encom.codigo_encomienda} que enviaste a ${encom.recibe}</p>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Mira los datos de la persona a cargo de recibió y confirmó tu encomienda </p>
                          <br>
                          <h2 style="word-break:normal;font-size:16px;font-weight:700;padding-bottom:15px;margin:0">Datos de encomienda</h2>
                          <div>
                            <p> <b>De:</b> ${ encom.envia }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_emisora}</p>
                            <p> <b>Para:</b> ${ encom.recibe }</p>
                            <p> <b>Telefono:</b> ${encom.telefono_receptora}</p>
                            <p> <b>Enviado por:</b> ${ encom.emisor }; <i>${encom.correo_emisor}</i></p>
                            <p> <b>Atendido por:</b> ${ encom.receptor }; <i>${encom.correo_receptor}</i></p>
                            <p> <b>Empresa:</b> ${ encom.empresa }</p>
                            <p> <b>Chofer:</b> ${ encom.chofer }</p>
                            <p> <b>#Teléfono del Chofer:</b> ${ encom.telefono_chofer }</p>
                            <p> <b>Descripción de transporte:</b> ${ encom.descripcion_transporte }</p>
                            <p> <b>Fecha y hora de salida:</b> ${ encom.fecha_envio } ${ encom.hora_envio }</p>
                            <p> <b>Fecha y hora de llegada:</b> ${ encom.fecha_llegada } ${ encom.hora_llegada }</p>
                            <p> <b>Descripción:</b> ${ encom.descripcion }</p>
                          </div>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <p>Si quiere ver mas detalles haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/sent">Haz click aqui</a></center>
          <p>¡Gracias por tu servicio!</p>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}

async function mailResetPassword(user){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: `${user.correo}`,
      subject: `Cambio de contraseña Sistema de encomiendas de PILARH`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;padding:10px 10px 0" valign="top" align="center">
                  <img alt="PILARH-OPDF" title="Pilarh" src="https://fundacioncovelo.hn/wp-content/uploads/2020/06/Logo-PILARH.png" data-image-whitelisted="" class="CToWUd">
              </td>
          </tr>
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola ${user.nombre}!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Para poder cambiar tu contraseña haz click en el siguiente enlace</p>
                          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/change">Haz click aqui</a></center>
                          </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}

module.exports = {
  mailBienvenida,
  mailNuevaEncomienda,
  mailEncomiendaEditada,
  mailResetEncomienda,
  mailEncomiendaValidada,
  mailEncomiendaConfirmada,
  mailResetPassword
};