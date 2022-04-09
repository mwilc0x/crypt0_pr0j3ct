import { GraphQLObjectType } from 'graphql';
import usersQueries from '../model/users/queries';

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: usersQueries.user
    }
});
