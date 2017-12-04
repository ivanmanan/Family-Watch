DROP TABLE IF EXISTS Police;

CREATE TABLE User (
       User_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       Username varchar(255) NOT NULL,
       Password varchar(255) NOT NULL,
       Host varchar(10) NOT NULL
);

CREATE TABLE GPS (
       hid INT,
       Time_record TIMESTAMP NOT NULL,
       Longitude FLOAT(10,6),
       Latitude FLOAT(10,6),

       FOREIGN KEY (hid) references User(User_ID)
);

INSERT INTO User (Username, Password, Host) VALUES ("ivan", "password", "true");
INSERT INTO User (Username, Password, Host) VALUES ("lewis", "password", "false");
INSERT INTO User (Username, Password, Host) VALUES ("brian", "password", "false");
INSERT INTO User (Username, Password, Host) VALUES ("yb", "password", "false");
