import { GraphQLObjectType } from 'graphql';
import imagesQueries from '../model/images/queries';

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        image: imagesQueries.image,
        images: imagesQueries.images
    }
});
