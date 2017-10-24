# Setting Up Express Stack
## This must be run on the root directory of the <REPO>

## Initialize Express
$ npm install express --save
$ npm install express-generator -g
$ express <REPO>
$ cd <REPO>
$ npm install

## Initialize Git Repo
$ git init
$ git add .
$ git commit -m "First commit"
### Go to github.com/username
### Copy remote repository URL
$ git remote add origin <REPO URL>
$ git remote -v
$ git branch --set-upstream-to=origin/master master
$ git pull --allow-unrelated-histories
$ git push origin master

## Set-up Server
$ mv app.js server.js
$ nano server.js

### copy and paste files:
$ mv views/index.jade views/home.html
  express/server.js --> repo/
  express/index.js  --> repo/routes/
  express/home.html --> repo/views/
  express/error.html --> repo/views/
  express/config.js --> repo/config.js

### Set-up html view engine
$ npm install ejs

## Setting up MySQL Connection to Express
$ npm install mysql
### Set-up localhost password for mysql
$ sudo apt-get install mysql-server

## Setting up .gitignore
$ nano .gitignore
put in 'config.js' into the file

## Setting up Bootstrap
$ npm install bootstrap@3

## Run on localhost:5000
$ npm start

===================================================================================
# React's README - Setting up Express and React

https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

Can view my own 'react' folder to see skeleton

## Create Repo
$ mkdir <REPO>
$ cd <REPO>

## Initialize Git Repo
$ git init
$ git add .
$ git commit -m "First commit"
### Go to github.com/username
### Copy remote repository URL
$ git remote add origin <REPO URL>
$ git remote -v
$ git branch --set-upstream-to=origin/master master
$ git pull --allow-unrelated-histories
$ git push origin master
Create a LICENSE if necessary

## Create React Client in Repo Directory
$ create-react-app client

## Initializing Node API
$ npm init
entry point: (index.js) --> change to server.js
$ npm install express --save

## Install Concurrently
$ npm i --save-dev concurrently
$ concurrently "npm node server.js" "cd client && npm start"
### Place this in <REPO> package.json file
#### Quotes are escaped because it is in json file
"scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "node server.js",
    "client": "node start-client.js"
  },

## Set-up Proxy
$ cd client
$ nano package.json
underneath scripts bracket, add a ',' comma, and then put-in:
"proxy": "http://localhost:3001"
$ npm start

## Set-up Bootstrap for React
$ npm install --save react react-dom
$ npm install --save react-bootstrap
Add these links to the root html file:
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">

===================================================================================

# Setting Up React, Meteor, and MongoDB

## Install Meteor
$ curl https://install.meteor.com/ | sh

## Create Meteor skeleton and git initialize the repo
$ meteor-create <REPO>
$ cd <REPO>
$ git init
$ git add .
$ git commit -m "First commit"
### Go to github.com/username
### Copy remote repository URL
$ git remote add origin <REPO URL>
$ git remote -v
$ git branch --set-upstream-to=origin/master master
$ git pull --allow-unrelated-histories
$ git push origin master

## Install React
$ sudo meteor npm install --save react react-dom
### Similar set-up to Crux Repo

## Install Bootstrap
$ meteor add twbs:bootstrap

## Set-up MongoDB
$ meteor npm install --save react-addons-pure-render-mixin
$ meteor add react-meteor-data

## Run on localhost:3000
$ npm start
