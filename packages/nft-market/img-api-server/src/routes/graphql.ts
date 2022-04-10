import { graphqlHTTP } from 'express-graphql';
import { json, Router } from 'express';
import { isProduction } from '../util';
import schema from '../schema/index';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', graphqlHTTP({
    schema,
    graphiql: !isProduction()
}));

router.post('/', graphqlHTTP({
    schema,
    graphiql: false
}));

export default router;
