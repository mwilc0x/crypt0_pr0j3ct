import { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLFloat
} from 'graphql';
import UserType from './type';
import Users from './users';

export default {
    addUser: {
        type: UserType,
        args: {
            ethereum_key: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Users.createEntry.bind(Users)
    },
    updateUser: {
        type: UserType,
        args: {
            ethereum_key: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Users.updateEntry.bind(Users)
    }
}
