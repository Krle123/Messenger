CREATE DATABASE IF NOT EXISTS DEFAULT_DB;

USE DEFAULT_DB;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(15) NOT NULL,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
	idMsg INT PRIMARY KEY AUTO_INCREMENT,
	idRcv INT,
    idSnd INT,
    messageContent VARCHAR(500) NOT NULL,
    msgTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    msgRead BOOL NOT NULL DEFAULT false
);

-- kad se izabere korisnik sa kojim pricamo
SELECT *
FROM messages
WHERE (idRcv = var1 AND idSnd = var2) OR (idRcv = var2 AND idSnd = var1)

-- neprocitane poruke u meniju
SELECT *
FROM messages
WHERE idRcv = var1 AND NOT msgRead

INSERT INTO messages (idRcv, idSnd, messageContent) 
VALUES (?, ?, ?)