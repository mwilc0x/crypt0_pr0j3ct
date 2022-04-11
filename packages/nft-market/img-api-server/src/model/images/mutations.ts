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
            file: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: Images.createEntry.bind(Images)
    },
}
