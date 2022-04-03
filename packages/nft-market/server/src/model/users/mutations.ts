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
            type:   { type: new GraphQLNonNull(GraphQLString) },
            price:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: Users.createEntry.bind(Users)
    },
    updateUser: {
        type: UserType,
        args: {
            id:     { type: GraphQLID },
            type:   { type:new GraphQLNonNull(GraphQLString) },
            price:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: Users.updateEntry.bind(Users)
    }
}
