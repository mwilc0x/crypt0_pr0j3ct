import { STRING } from 'sequelize';

export default function(sequelize) {
    const User = sequelize.define('users', {
      email: {
        type: STRING
      },
      password: {
        type: STRING
      }
    });
  
    return User;
  };
