## Know How de MacherCommerce sobre MEAN

### Mantenimiento

##### Ver el estado actual del servidor de express y los requests

  + Conectarse a ant con el siguiente comando `ssh ant@66.198.240.38 -p 7822`
  + En la terminal ejecutar `pm2 monit`

##### Reiniciar el servidor de MEAN en caso de que se caiga el servicio o por cambios hechos en el código fuera del directorio *'static'*

  + Conectarse a ant con el siguiente comando `ssh ant@66.198.240.38 -p 7822`
  + Con la terminal posicionada en $HOME (`ant@src6 [~]#`) ejecutar `macherd restart`

##### Conexión al servidor

  + Para poder conectarse a ant es necesario añadir la clave pública de la máquina desde la que se quiere conectar en el panel de configuración del servidor.
  + Para eso hay que obtener la clave pública con el siguiente comando `cat $HOME/.ssh/id_rsa.pub`, en caso de no existir el archivo, se crea con el siguiente comando `ssh-keygen -t rsa`.
  + Luego, copiar el contenido del archivo.
  + Dirigirse a [https://wwwsrc6.supercp.com:2087/](https://wwwsrc6.supercp.com:2087/) > *List Accounts* > Acceder al panel de ant > *Seguridad* > *Acceso a SSH* > *Administrar claves SSH* > *Importar clave* y ahí indicar el nombre de la clave y pegar el contenido del archivo copiado en el campo con la insignia **'Pegue la clave pública en el cuadro de texto que aparece a continuación: '**
  + Hacer click en importar y al volver al panel de claves hacer click en 'Administrar' y autorizar la clave.

### Push to Production

##### Para añadir cambios a un proyecto ya funcionando

  + Editar el archivo *gulpfile.js*, comentar la linea que **no posee** dist en los nombres de los métodos por la que **si los tiene**.
  + Desde una consola posicionada en la carpeta raiz del proyecto ejecutar `./scripts/auto-deployar.sh small-dist`
  + Si los cambios sobre archivos incluyen cambios en archivos de express, hay que conectarse al servidor y ejecutar `macherd restart` como se indica mas arriba.
  + Si los cambios incluyen nuevas librerias, hay que conectarse al servidor, ejecutar `macherd stop`, estando posicionado en *$HOME/public_html/* ejecutar `npm install` y luego desde *$HOME* ejecutar macherd start

### Añadir nuevo modelo de datos al sistema

##### Añadir el modelo de Mongo

  1. Desde una consola posicionada en la carpeta raiz del proyecto ejecutar `mongoose-gen`
  2. Añadir la dependencia al nuevo modelo (en adelante `<nmod>`) al archivo *app.js* con las lineas:
    ```
    const <nmod>s = require("./routes/<nmod>Routes");
    app.use("/api/<nmod>s", <nmod>s);
    ```
  3. Asegurarse de que el archivo *models/&lt;nmod&gt;Model.js* tenga los atributos requeridos y sus tipos bien definidos

##### Añadir la interfaz del admin

  4. Desde la consola ejecutar `yo macher-ecommerce:model`
  5. Añadir al archivo *app/admin/src/js/services/data-provider.js*, dentro del `return`, el contenido del archivo *&lt;nmod&gt;.js* ubicado en la misma carpeta y luego **eliminar el archivo**
  6. Verificar que los campos definidos en *app/admin/views/&lt;nmod&gt;/new.pug* y en *app/admin/views/&lt;nmod&gt;/edit.pug* estén correctos y que sus funcionalidades en *app/admin/src/js/controllers/&lt;nmod&gt;/_new.js* y *app/admin/src/js/controllers/&lt;nmod&gt;/_edit.js* también sean adecuados.
