DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS FDSManagers CASCADE;
DROP TABLE IF EXISTS RestaurantStaff CASCADE;
DROP TABLE IF EXISTS Rate CASCADE;

CREATE TABLE Users (
uid         INTEGER,
name        VARCHAR(255)     NOT NULL,
password    INTEGER          NOT NULL,
PRIMARY KEY (uid)
);

CREATE TABLE Customers (
uid         INTEGER,
rewardPts   INTEGER DEFAULT '0' NOT NULL,
signUpDate  DATE                NOT NULL,
cardDetails VARCHAR(255),
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users ON DELETE CASCADE
);

CREATE TABLE FDSManagers (
uid         INTEGER,

PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users ON DELETE CASCADE
);

CREATE TABLE RestaurantStaff (
uid         INTEGER,
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users ON DELETE CASCADE
);


CREATE TABLE Rate (
uid            INTEGER,
review         VARCHAR(255)     NOT NULL,
star           INTEGER      DEFAULT NULL CHECK (rating >= 0 AND rating <= 5), 
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users ON DELETE CASCADE
);
