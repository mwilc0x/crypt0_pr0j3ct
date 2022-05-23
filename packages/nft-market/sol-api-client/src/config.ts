import { Dialect } from 'sequelize';

type Pool = {
    max: number,
    min: number,
    acquire: number,
    idle: number
};

type DbConfig = {
    HOST: string,
    DB: string,
    USER: string,
    PASSWORD: string,
    dialect: Dialect,
    pool: Pool
};

export default <DbConfig>{
    HOST: process.env.POSTGRES_HOST,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.POSTGRES_DB,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
