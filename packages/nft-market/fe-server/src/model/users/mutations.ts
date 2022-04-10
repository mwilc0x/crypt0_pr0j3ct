import { 
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import UserType from './type';
import Users from './users';

export default {
    addUser: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Users.createEntry.bind(Users)
    },
    updateUser: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Users.updateEntry.bind(Users)
    }
}
