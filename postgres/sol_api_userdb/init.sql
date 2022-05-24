CREATE TABLE users (
  email CHAR(42) NOT NULL PRIMARY KEY,
  password CHAR(50) NOT NULL
);

INSERT INTO users (email, password) VALUES 
('mwilcox56@gmail.com', 'testing123');