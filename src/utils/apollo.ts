import { useMemo } from 'react';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, NormalizedCacheObject, concat } from '@apollo/client';
import { gql } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  const httpLink = new HttpLink({ uri: 'https://countries.trevorblades.com/' });

  const customMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'header-field': 'this is value of custom header field',
      },
    });

    return forward(operation);
  });
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(customMiddleware, httpLink),
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-site origin request
    // Have other options like:
    // same-origin: only send credentials if requesting client and server are the same origin
    // omit: never send or receive credentials
    credentials: 'include',
  });
};

const initializeApollo = (initialState: any = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export { gql, initializeApollo, useApollo };
