import { INTEGER, STRING } from 'sequelize';

export default function(sequelize) {
    const Role = sequelize.define('roles', {
      id: {
        type: INTEGER,
        primaryKey: true
      },
      name: {
        type: STRING
      }
    });
  
    return Role;
};
