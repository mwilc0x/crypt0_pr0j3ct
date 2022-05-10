CREATE TABLE `collections` (
  `id` CHAR(100) PRIMARY KEY,
  `name` CHAR(100) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `website` CHAR(100) NOT NULL,
  `twitter` CHAR(100) NOT NULL,
  `discord` CHAR(100) NOT NULL,
);

CREATE TABLE `mints` (
  `mint_account` CHAR(100) PRIMARY KEY,
  `name` CHAR(100) NOT NULL,
  `collectionSymbol` CHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `attributes` JSON NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `token_address` CHAR(100),
  `owner_address` CHAR(100),
  `primary_sale_happened` BOOLEAN NOT NULL,
  `seller_fee_basis_points` SMALLINT NOT NULL,
  `external_url` VARCHAR(100) NOT NULL,
  `uri` VARCHAR(100) NOT NULL
);

INSERT INTO `collections` (`id`, `name`, `description`, `image`, `website`, `twitter`, `discord`)
VALUES (
  `thugbirdz`, 
  `Thugbirdz`, 
  `A collection of 3,333 uniquely generated, tough and collectible thugbirdz.`,
  `https://www.arweave.net/nGvadeW0UuvIgzZUyNKaQ-c8400CDQn1FwNthOJ_KUw?ext=png`,
  `https://www.thugbirdz.com/`,
  `https://twitter.com/thugbirdz`,
  `https://discord.gg/thugdao`
);
