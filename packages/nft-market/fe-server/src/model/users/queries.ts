import { 
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat 
} from 'graphql';
import UserType from './type';
import Users from './users';

export default {
    user: {
        type: UserType,
        args: {
            ethereum_key: {
                type: GraphQLString
            }
        },
        resolve: Users.getByEthAddress.bind(Users)
    }
};
