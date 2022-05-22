CREATE TABLE users (
  id CHAR(42) NOT NULL PRIMARY KEY,
  password CHAR(50) NOT NULL
);

INSERT INTO users (id, password) VALUES 
('mwilcox56@gmail.com', 'testing123');