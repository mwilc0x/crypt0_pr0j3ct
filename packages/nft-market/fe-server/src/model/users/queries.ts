import { 
    GraphQLString,
} from 'graphql';
import UserType from './type';
import Users from './users';

export default {
    user: {
        type: UserType,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: Users.getByEthAddress.bind(Users)
    }
};
