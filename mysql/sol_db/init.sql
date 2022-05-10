CREATE TABLE `collections` (
  `id` CHAR(100) PRIMARY KEY,
  `mints` JSON NOT NULL
);

CREATE TABLE `metadata` (
  `key` CHAR(100) PRIMARY KEY,
  `name` CHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `attributes` JSON NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `token_address` CHAR(100),
  `owner_address` CHAR(100)
);