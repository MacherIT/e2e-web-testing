#!/bin/bash

cd "$HOME"

NODE_VERSION="${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\-linux-x64.tar.xz</a>.*|\1|p')}-linux-x64"

mkdir "$HOME/Downloads"

curl "downloads.mongodb.org/linux/mongodb-linux-x86_64-amazon-latest.tgz" > "$HOME/Downloads/mongodb-latest.tgz"

curl "https://nodejs.org/dist/latest/node-$NODE_VERSION.tar.xz" > "$HOME/Downloads/node-latest.tar.xz"

mkdir "$HOME/bin"

cd "$HOME/Downloads"

tar -zxvf "mongodb-latest.tgz"

MONGO_VERSION="$(ls | grep mongodb-linux)"

mv "$MONGO_VERSION" "mongodb"

# export PATH="$HOME/Downloads/mongodb/bin:$PATH" Esta linea es volatil

mkdir -p "$HOME/mongodata/db"

tar xvf "node-latest.tar.xz"

mv "node-$NODE_VERSION" "nodejs"

cp "$HOME/Downloads/nodejs/bin/node" ~/bin/

ln -s "$HOME/Downloads/nodejs/lib/node_modules/npm/bin/npm-cli.js" "$HOME/bin/npm"
