import { 
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import ImageType from './type';
import Images from './images';

export default {
    addImage: {
        type: ImageType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            data: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: Images.createEntry.bind(Images)
    },
}
