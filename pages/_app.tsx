import '../styles/globals.css';
import { useApollo } from '../src/utils/apollo';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
