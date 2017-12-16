# Content
* Expected Functionalities
* Installation Instructions
* Server Setup
* Resources

## Expected Functionalities

1. Participants will be logged in and their locations will be tracked.

2. The host will be able to see location history of all
   the participants after every certain interval of time.

## Installation Instructions

1. Install [Node.js](https://nodejs.org/en/download/).
2. Install all Node.js dependencies.
   ```bash
   cd /path/to/family-watch/
   npm install
   cd /path/to/family-watch/client
   npm install
   ```
3. Install MySQL.
   ```bash
   npm install mysql
   ```
4. Set up localhost password for MySQL. For [MacOS, use this guide](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html).
   ```bash
   sudo apt-get install mysql-server
   ```

5. Enter your database credentials.
   ```bash
   cp skeleton.js config.js
   nano config.js
   ```

6. Run the SQL script to set-up the bare-essentials for the database. Make sure
   you are running this command in the family-watch directory.
   ```bash
   $ mysql -u root -p
   mysql> create database family;
   mysql> use family;
   mysql> source ./family.sql;
   mysql> exit
   ```

7. Install Bootstrap.
   ```bash
   npm install --save react react-dom
   npm install --save react-bootstrap
   ```

8. Generate certificates in the family-watch directory.
   ```bash
   ./genererate-certificates.sh
   ```

9. Run on localhost.
   ```bash
   npm start
   ```

## Server Setup

When hosting projects over WLAN, the firewall must be configured. In Ubuntu, the
ufw (uncomplicated firewall) must allow incoming messages.

Procedure:
   ```bash
   Super-s, search 'Firewall', click 'Firewall configuration', then change
   'Incoming' section to 'Allow'
   ```

## Resources

Do not waste hours on these tutorials. Just skim through until you get the
general feel of these libraries.

1. [React.js intro. tutorial](https://reactjs.org/tutorial/tutorial.html)

2. [React.js advanced tutorial](https://reactjs.org/docs/installation.html)

3. [Bootstrap
   guide](https://www.w3schools.com/bootstrap/bootstrap_grid_basic.asp) - This
   is needed for mobile interfaces.

4. [Google Maps
   API](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)

5. [Google Maps API with
   React.js](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)

6. Need to figure out how to use GPS embedded in our mobile devices.

7. [Setting up
   server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

8. [See Proposal](https://github.com/ivanmanan/family-watch/blob/master/reads/TeamNeighborhood.pdf)

