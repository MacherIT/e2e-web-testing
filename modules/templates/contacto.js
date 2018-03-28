module.exports = {
  usuario: {
    text: req => "Hemos recibido correctamente su consulta, nos contactaremos a la brevedad.\nAtte. ant.",
    html: req => "Hemos recibido correctamente su consulta, nos contactaremos a la brevedad.<br />Atte. ant."
  },
  cliente: {
    text: req => `Se ha relizado la siguiente consulta desde el formulario de contacto:\nNombre: ${req.body.nombre ? req.body.nombre : '--'}\nTelefono: ${req.body.telefono ? req.body.telefono : '--'}\nEmail: ${req.body.email ? req.body.email : '--'}\nConsulta: ${req.body.consulta ? req.body.consulta : '--'}`,
    html: req => `Se ha relizado la siguiente consulta desde el formulario de contacto:<br />Nombre: ${req.body.nombre ? req.body.nombre : '--'}<br />Telefono: ${req.body.telefono ? req.body.telefono : '--'}<br />Email: ${req.body.email ? req.body.email : '--'}<br />Consulta: <p style="white-space: pre-line;">${req.body.consulta ? req.body.consulta : '--'}`
  }
};
