import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'User',
    description: 'A NFT market user',
    fields: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        ethereum_key: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
