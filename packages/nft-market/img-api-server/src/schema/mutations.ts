import { GraphQLObjectType } from 'graphql';
import imagesMutation from '../model/images/mutations';

export default new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addImage: imagesMutation.addImage,
    }
});
