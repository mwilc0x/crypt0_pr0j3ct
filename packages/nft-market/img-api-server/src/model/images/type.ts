import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'NFTImage',
    description: 'An NFT image',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        data: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});
