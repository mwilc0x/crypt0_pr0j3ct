import { 
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat 
} from 'graphql';
import UserType from './type';
import Users from './users';

export default {
    users: {
        type: new GraphQLList(UserType),
        args: {
            type: {
                type: GraphQLString
            },
            price: {
                type: GraphQLFloat
            }
        },
        resolve: Users.findMatching.bind(Users)
    },
    user: {
        type: UserType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve: Users.getByID.bind(Users)
    }
};
