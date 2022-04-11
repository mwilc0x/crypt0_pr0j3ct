import { 
    GraphQLList,
    GraphQLString,
} from 'graphql';
import ImageType from './type';
import Images from './images';

export default {
    images: {
        type: new GraphQLList(ImageType),
        args: {
            containsId: {
                type: [GraphQLString]
            },
        },
        resolve: Images.findMatchingFromList.bind(Images)
    },
    image: {
        type: ImageType,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: Images.getByID.bind(Images)
    }
};
