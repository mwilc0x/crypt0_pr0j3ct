import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'User',
    description: 'A NFT market user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
