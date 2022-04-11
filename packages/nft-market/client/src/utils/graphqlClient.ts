import { dedupExchange, cacheExchange, fetchExchange, createClient } from 'urql';
import {
  makeOperation,
  Operation,
  Exchange,
} from '@urql/core';
import { pipe, map } from 'wonka';
import { getWebServerUrl, getApiUrl } from './api';

const defaultURL = `${getWebServerUrl()}/graphql`;
const getURL = (service: string) => {
  if (!service) {
    return defaultURL;
  }

  if (service === 'image') {
    return `${getApiUrl()}/graphql`;
  } else {
    return defaultURL;
  }
}

const requestPolicyExchange = (options?: any): Exchange => ({
  forward,
}) => {
  const processIncomingOperation = (operation: Operation): Operation => {
    if (operation) {
      const { context } = operation;
      return makeOperation(operation.kind, operation, {
        ...context,
        url: getURL(context.service),
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

export default createClient({
  url: defaultURL,
  exchanges: [dedupExchange, cacheExchange, requestPolicyExchange(), fetchExchange]
});
