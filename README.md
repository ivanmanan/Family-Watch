# Expected Functionalities

1. The host will be logged into the web application and see everyone’s
   location. As the host gets closer to a participant, the host will have
   directions pointing to his or her location.

2. Participants will be logged in and their locations will be tracked.

3. If there is extra time: The host will be able to see location history of all
   the participants after every certain interval of time.

# Installation Instructions

1. Install [Node.js](https://nodejs.org/en/download/).
2. Install MySQL.
   ```bash
   npm install mysql
   ```
3. Set up localhost password for MySQL. (Use Homebrew for MacOS)
   ```bash
   sudo apt-get install mysql-server
   ```

4. Enter your database credentials.
   ```bash
   cp skeleton.js config.js
   nano config.js
   ```

5. Run the SQL script to set-up the bare-essentials for the database. Make sure
   you are running this command in the Police-Watch directory.
   ```bash
   $ mysql -u root -p <PASSWORD>
   mysql> create database police;
   mysql> use police;
   mysql> source ./police.sql;
   mysql> exit
   ```

6. Install Bootstrap
   Instructions will be posted later.

7. Run on localhost.
   ```bash
   npm start
   ```
