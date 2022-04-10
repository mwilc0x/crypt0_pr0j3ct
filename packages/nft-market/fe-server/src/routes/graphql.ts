import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { isProduction } from '../util';
import schema from '../schema/index';

const router = Router();

router.get('/', graphqlHTTP({
    schema,
    graphiql: true
    // graphiql: !isProduction()
}));

router.post('/', graphqlHTTP({
    schema,
    graphiql: false
}));

export default router;
