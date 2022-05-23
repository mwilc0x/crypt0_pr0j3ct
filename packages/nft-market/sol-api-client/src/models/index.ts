import { Sequelize } from 'sequelize';
import UserModel from './user';
import RoleModel from './role';
import config from '../config';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

type SequelizedDB = {
  sequelize: Sequelize,
  user: any,
  role: any,
  ROLES: string[]
};

const db: SequelizedDB = {
  sequelize: sequelize,
  user: UserModel(sequelize),
  role: RoleModel(sequelize),
  ROLES: ['user', 'admin', 'moderator']
};

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});

export default db;
