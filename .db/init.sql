CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username char(50) NOT NULL,
  ethereum_key char(42) NOT NULL
);

INSERT INTO users (username, ethereum_key)
VALUES ('infil00ps', '0x139E7C4a708f966D0F0B8b787504D72394aC6534');