#! /bin/bash

# update system
sudo apt-get update

# install Java
sudo apt-get install -y default-jre

# download nodesource installer
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs

# install Nginx
sudo apt-get install -y nginx
