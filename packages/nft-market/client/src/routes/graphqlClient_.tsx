import {
    Client,
    createClient,
    dedupExchange,
    cacheExchange,
    fetchExchange,
    makeOperation,
  } from 'urql'
  import { authExchange } from '@urql/exchange-auth'
  import { getWebServerUrl, getApiUrl } from '../utils/api';

  export default function createGraphqlClient(): Client {
    return createClient({
      url: `${getWebServerUrl()}/graphql-fe`, // default endpoint
      fetchOptions: {
        credentials: 'same-origin',
        method: 'GET',
        // default endpoint headers
        headers: {
          Authorization: `Bearer ...`,
          'Content-Type': 'application/json',
        }
      },
      preferGetMethod: true,
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange({
          addAuthToOperation({ operation }) {
            // if clientName does not exist, we return operation without modifications
            if (!operation.context.clientName) {
              return operation
            }
  
            const { clientName, fetchOptions } = operation.context
            const options = typeof fetchOptions === 'function' ? fetchOptions() : fetchOptions ?? {}
  
            switch (clientName) {
              case 'fe-server': {
                // Endpoint A headers
                const headers = {
                  ...options.headers,
                  Authorization: `Bearer ...`,
                }
  
                // New context for endpoint A
                const context = {
                  ...operation.context,
                  url: `${getWebServerUrl()}/graphql-fe`,
                  fetchOptions: {
                    ...options,
                    headers,
                  }
                }
  
                return makeOperation(operation.kind, operation, context)
              }
              case 'img-api-server': {
                // Endpoint B headers
                const headers = {
                  ...options.headers,
                  Authorization: `Bearer ...`,
                }
  
                // New context for endpoint B
                const context = {
                  ...operation.context,
                  url: `${getApiUrl()}/graphql-img`,
                  fetchOptions: {
                    ...options,
                    headers,
                  }
                }
  
                return makeOperation(operation.kind, operation, context)
              }
              default: {
                throw new Error(`Unexpected object: ${clientName}`)
                return operation
              }
            }
          },
          getAuth: async () => {},
        }),
        fetchExchange,
      ],
    })
  }