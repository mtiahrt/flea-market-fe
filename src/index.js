import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_END_POINT_URI`],
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/*<Elements stripe={stripePromise}>*/}
      <App />
      {/*</Elements>*/}
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
