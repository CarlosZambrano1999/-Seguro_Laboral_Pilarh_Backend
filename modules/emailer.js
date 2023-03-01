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

async function mailEnviarReclamo(reclamo, mon, ref, empresa){
  try {
    const mes = new Intl.DateTimeFormat('es-ES', {month: 'long'}).format(new Date());
    const anio = new Date().getFullYear();
    const dia = new Date().getDate();
    let monet = "";
    let refer = "";
    for( let i=0; i<mon.length; i++){
      monet = monet + ` <b>     .</b> 1 ${mon[i].tipo} N° ${mon[i].numero} ${mon[i].descripcion} ${mon[i].moneda}. ${convertir(mon[i].valor)} <br>`     
    }  
    if(ref.length>0){
      for (let j=0; j<ref.length; j++){
        refer = refer + `<b>     .</b> ${ref[j].cantidad} ${ref[j].descripcion} <br>`
      }
    }
    function convertir(valor_reclamo){
      const valor_final= parseFloat(valor_reclamo).toFixed(2);
      return valor_final;
    }
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: reclamo.correo,
      subject: `Tu reclamo ha sido enviado a la aseguradora ${dia}/${mes}/${anio}`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
        <div>
          <b>El siguiente Reclamo ha sido enviado a la aseguradora</b>
        </div> <br>
      
        <div class="mensaje" style="border= 1 px solid #000">
          <p>Santa Rosa de Copán, ${dia} de ${mes} del ${anio}</p>
          
          <p>Adjunto a la presente le envío formulario de reclamaciones de gastos médicos, con toda su documentación soporte del siguiente asegurado:</p>
          <p><b>Titular:</b> ${reclamo.nombre}, póliza N. ${empresa.poliza}, Certificado N. ${reclamo.certificado}, cuyo valor del reclamo asciende a:  <b>${reclamo.moneda}. ${convertir(reclamo.valor_reclamo)}</b></p><br>
          <p><b>Paciente:</b> ${reclamo.paciente}</p> 
          <p>Documentos:</p>
          ${monet}
          ${refer}
        </div> 
          <p>Para ver mas detalles haz clik en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}


async function mailConsultar(user){
  try {
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: `${user.correo}`,
      subject: `Consulta de reclamos Seguros`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
          <tr style="padding:0">
              <td style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px" valign="top" align="center">
                  <table style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" width="580" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff">
                      <tbody>
                          <tr style="padding:0">
                          <td class="m_-2548514397841082045content" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px" valign="top" align="left">
                          <h1 style="word-break:normal;font-size:18px;font-weight:700;line-height:21px;padding-bottom:10px;margin:0">!Hola ${user.nombre}!</h1>
                          <p style="font-size:14px;padding-bottom:10px;margin:0">Para poder ver tus reclamos haz click en el siguiente enlace</p>
                          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/myClaims">Haz click aqui</a></center>
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

async function mailConfirmarReclamo(reclamo, mon, ref, empresa, factura){
  try {
    const mes = new Intl.DateTimeFormat('es-ES', {month: 'long'}).format(new Date());
    const anio = new Date().getFullYear();
    const dia = new Date().getDate();
    let monet = "";
    let refer = "";
    for( let i=0; i<mon.length; i++){
      monet = monet + ` <b>     .</b> 1 ${mon[i].tipo} N° ${mon[i].numero} ${mon[i].descripcion} ${mon[i].moneda}. ${convertir(mon[i].valor)} <br>`     
    }  
    if(ref.length>0){
      for (let j=0; j<ref.length; j++){
        refer = refer + `<b>     .</b> ${ref[j].cantidad} ${ref[j].descripcion} <br>`
      }
    }
    function convertir(valor_reclamo){
      const valor_final= parseFloat(valor_reclamo).toFixed(2);
      return valor_final;
    }
    const info = await transport.sendMail({
      from: '"PILARH Encomiendas" <pilarh.encomiendas@gmail.com>',
      to: reclamo.correo,
      subject: `Tu reclamo ha sido reembolsado ${dia}/${mes}/${anio}`,
      html: `</center>
      <tbody style="background-color:#f9f9f9">
        <div>
          <b>El siguiente Reclamo ha sido reembolsado</b>
        </div> <br>
      
        <div class="mensaje" style="border= 1 px solid #000">
          <p>Santa Rosa de Copán, ${dia} de ${mes} del ${anio}</p>
          
          <p>Adjunto a la presente le envío formulario de reclamaciones de gastos médicos, con toda su documentación soporte del siguiente asegurado:</p>
          <p><b>Titular:</b> ${reclamo.nombre}, póliza N. ${empresa.poliza}, Certificado N. ${reclamo.certificado}, cuyo valor del reclamo asciende a:  <b>${reclamo.moneda}. ${convertir(reclamo.valor_reclamo)}</b></p><br>
          <p><b>Paciente:</b> ${reclamo.paciente}</p> 
          <p>Documentos:</p>
          ${monet}
          ${refer}
        </div> <br>
        <table>
          <tbody>
            <tr>
              <td><b>Total Cubierto</b></td>
              <td>${convertir(factura.total_cubierto)}</td>
            <tr>
              <td>(-) Deducible</td>
              <td>${convertir(factura.deducible)}</td>
            </tr> 
            <tr>  
              <td>(-) Coaseguro</td>
              <td>${convertir(factura.coaseguro)}</td>
            <tr>
              <td><hr></td>
              <td><hr></td>
            </tr>
            <tr>
              <td><b>Total a Pagar</b></td>
              <td>${convertir(factura.total_a_pagar)}</td>
            </tr>    
          </tbody>
        </table> 
        <br>
        <div>
          <h6>${factura.fecha}</h6>
          <h4><b>OBSERVACIONES</b></h4>
          <p>${factura.observaciones}</p>
        </div>
          <p>Para ver mas detalles consulta en el siguiente enlace</p>
          <center><a href="http://${env.FE_HOST}${env.FE_PORT}/">Haz click aqui</a></center>
      </tbody>
  </center>`,
  });  
  } catch (error) {
    console.log(error);
  }
  return;
}


module.exports = {
  mailEnviarReclamo,
  mailConfirmarReclamo,
  mailConsultar
};