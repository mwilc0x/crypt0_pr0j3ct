create table if not exists `images` (
    `id` varchar(100) not null,
    `data` longblob not null,
    `name` varchar(255) not null,
    primary key (id)
);