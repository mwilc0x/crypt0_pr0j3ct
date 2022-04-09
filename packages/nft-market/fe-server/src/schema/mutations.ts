import { GraphQLObjectType } from 'graphql';
import usersMutation from '../model/users/mutations';

export default new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addUser: usersMutation.addUser,
        updateUser: usersMutation.updateUser
    }
});
