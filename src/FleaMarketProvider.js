import { UserProfileContext } from './contexts/UserContext';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { useContext } from 'react';

const httpLink = new HttpLink({
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_END_POINT_URI`],
});
const FleaMarketProvider = ({ children }) => {
  const { userProfile } = useContext(UserProfileContext);

  const accessTokenMiddleware = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      'Access-Token': userProfile.accessToken,
    },
  }));

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([accessTokenMiddleware, httpLink]),
    defaultOptions: {
      query: { fetchPolicy: 'cache-and-network' },
    },
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default FleaMarketProvider;
