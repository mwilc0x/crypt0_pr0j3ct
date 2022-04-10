import { dedupExchange, cacheExchange, fetchExchange, createClient } from 'urql';
import {
  makeOperation,
  Operation,
  Exchange,
} from '@urql/core';
import { pipe, map } from 'wonka';
import { getWebServerUrl, getApiUrl } from './api';

// You can use options for inputs if you want to make this reusable for  the community
const requestPolicyExchange = (options?: any): Exchange => ({
  forward,
}) => {
  const processIncomingOperation = (operation: Operation): Operation => {
    console.log('YO! GRAPHQL TIME!', operation)
    if (operation) {
      // your own condition
      return makeOperation(operation.kind, operation, {
        ...operation.context,
        url: `${getWebServerUrl()}/graphql-fe`,
      });
    }
    
    return operation
  };

  return ops$ => {
    return pipe(
      ops$,
      map(processIncomingOperation),
      forward,
    );
  };
};

let myExchange = requestPolicyExchange;

const client = createClient({
  url: `${getWebServerUrl()}/graphql-fe`,
  exchanges: [dedupExchange, cacheExchange, myExchange(), fetchExchange]
});

export default client;
