#!/bin/bash

IP_SERVIDOR="75.98.172.211"
DB_MONGO="ant"

init() {

  USUARIO="$1"

  if [[ $USUARIO ]]; then #Indica nombre de usuario

    echo "Crea la carpeta de scripts"

    ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "mkdir /home/$USUARIO/scripts"

    echo "Copia mongo-node.sh"

    scp -P 7822 "scripts/mongo-node.sh" "$USUARIO@$IP_SERVIDOR:/home/$USUARIO/scripts/"
    #### scp -P 7822 "scripts/macherd" "$USUARIO@$IP_SERVIDOR:/home/$USUARIO/scripts/"

    echo "Ejecuta mongo-node.sh e instala mongodb y nodejs"

    ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "chmod +x /home/$USUARIO/scripts/mongo-node.sh; cd '/home/$USUARIO'; /home/$USUARIO/scripts/./mongo-node.sh"
    # ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "chmod +x /home/$USUARIO/scripts/mongo-node.sh; chmod +x /home/$USUARIO/scripts/macherd; ln -s /home/$USUARIO/scripts/macherd /home/$USUARIO/bin/macherd; cd '/home/$USUARIO'; /home/$USUARIO/scripts/./mongo-node.sh"

  else

    echo "Debe ingresar un nombre de usuario"

  fi
}

send-init() {

  echo "---- Iniciando deployment ----"

  USUARIO=""

  read -p "Ingrese un nombre de usuario de A2: " USUARIO

  if [[ $USUARIO ]]; then #Indica nombre de usuario

    echo "Ejecuta el build del proyecto"

    gulp dist

    echo "Exporta la base de datos"

    mongodump -d "$DB_MONGO" -o "dist/${DB_MONGO}db"

    echo "Deploya el proyecto al servidor"

    V_ID="$(git rev-parse HEAD)"
    LISTA_ARCHIVOS="$(git diff-tree --no-commit-id --name-only -r $V_ID dist/)"

    # scp -rp -P 7822 $LISTA_ARCHIVOS "$USUARIO@$IP_SERVIDOR:/home/$USUARIO/public_html/"
    scp -rp -P 7822 dist/* "$USUARIO@$IP_SERVIDOR:/home/$USUARIO/public_html/"

    echo "Inicia el servidor de mongo"

    ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "nohup /home/$USUARIO/Downloads/mongodb/bin/mongod --dbpath /home/$USUARIO/mongodata/ --port 50201 >> /dev/null"

    echo "Instala dependencias npm y restaura la base de datos"

    ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "cd /home/$USUARIO/public_html/; /home/$USUARIO/bin/node /home/$USUARIO/Downloads/nodejs/lib/node_modules/npm/bin/npm-cli.js install; /home/$USUARIO/bin/node /home/$USUARIO/Downloads/nodejs/lib/node_modules/npm/bin/npm-cli.js install pm2 -g; /home/$USUARIO/Downloads/mongodb/bin/mongorestore -h localhost:50201 -d ${DB_MONGO} ${DB_MONGO}db/${DB_MONGO}/ --drop; /home/$USUARIO/Downloads/mongodb/bin/mongod --shutdown --dbpath /home/$USUARIO/mongodata/; /home/$USUARIO/scripts/./macherd start"

    exit 0

  else

    echo "Debe ingresar un nombre de usuario"

  fi

}
send() {

  echo "---- Iniciando deployment ----"

  USUARIO=""

  read -p "Ingrese un nombre de usuario de A2: " USUARIO

  if [[ $USUARIO ]]; then #Indica nombre de usuario

    echo "Ejecuta el build del proyecto"

    gulp dist

    echo "Exporta la base de datos"

    mongodump -d "$DB_MONGO" -o "dist/${DB_MONGO}db"

    echo "Genera commit de version"

    git add dist

    VERSION=""

    read -p "Ingrese la version a deployar: " VERSION

    git commit -m "[P] - Deploy version $VERSION"

    echo "Deploya el proyecto al servidor"

    V_ID="$(git rev-parse HEAD)"
    LISTA_ARCHIVOS="$(git diff-tree --no-commit-id --name-only -r $V_ID dist/)"

    scp -rp -P 7822 $LISTA_ARCHIVOS "$USUARIO@$IP_SERVIDOR:/home/$USUARIO/public_html/"

    echo "Restaura la base de datos y reinicia el servidor"

    ssh "$USUARIO@$IP_SERVIDOR" -p 7822 "cd /home/$USUARIO/public_html/; /home/$USUARIO/Downloads/mongodb/bin/mongorestore -h localhost:50201 -d ${DB_MONGO} ${DB_MONGO}db/${DB_MONGO}/ --drop; /home/$USUARIO/scripts/./macherd restart"

    exit 0

  else

    echo "Debe ingresar un nombre de usuario"

  fi

}

small-dist(){

  # FALTA AÑADIR PM2 Y NPM INSTALL, Y ENLAZAR EL MACHERD

  LISTO="s"
  read -p "¿Listo para enviar? [S/n]: " LISTO
  if [ "$LISTO" == "" ] || [ "$LISTO" == "S" ] || [ "$LISTO" == "s" ]; then
    export NODE_ENV="distout"
    gulp dist
    git add -A
    MSG="s"
    read -p "Indique el mensaje que se añadira en el commit: " MSG
    git commit -m "[RELEASE] - $MSG"
    # TODO: Cambiar [RELEASE] por git tags y buscar el commit 'V-ID' segun ese tag
    V_ID="$(git rev-parse HEAD)"
    LISTA_ARCHIVOS="$(git diff-tree --no-commit-id --name-only -r $V_ID dist/ | cut -c6-)"
    cd dist/
    rsync -avR $LISTA_ARCHIVOS --rsh='ssh -p7822' ${DB_MONGO}@${IP_SERVIDOR}:/home/${DB_MONGO}/public_html/
    echo "Ahora debe conectarse por ssh y hacer 'macherd restart'"
  fi
}

case "$1" in
init)
  init $2
  ;;
send)
  AUTOD="s"
  read -p "¿Desea autodeployar a A2? [S/n]: " AUTOD
  if [ "$AUTOD" == "" ] || [ "$AUTOD" == "S" ] || [ "$AUTOD" == "s" ]; then
    send
  fi
  ;;
send-init)
  AUTOD="s"
  read -p "¿Desea autodeployar a A2? [S/n]: " AUTOD
  if [ "$AUTOD" == "" ] || [ "$AUTOD" == "S" ] || [ "$AUTOD" == "s" ]; then
    send-init
  fi
  ;;
small-dist)
  small-dist
  ;;
*)
    echo "Usage:  {init <nombre-usuario-a2>}"
    exit 1
    ;;
esac
exit $?
