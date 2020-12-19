import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie'
import {CookieProvider} from 'react-cookie'
//
import { RecoilRoot } from 'recoil'

//aphollo client
import { setContext } from "apollo-link-context";
import {createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { 
  ApolloClient, 
  InMemoryCache,
  ApolloLink,
  ApolloProvider
} from '@apollo/client';


//links
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const authLink =  setContext((_, { headers }) => {
  const token =  Cookies.get('accessToken');
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials : 'include',
  request : async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'same-origin'
      }
    })
  }
});

const client = new ApolloClient({
  link : ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});
///

ReactDOM.render(
  <ApolloProvider client = {client}>
    <React.StrictMode>
        <RecoilRoot>
          <App />
          </RecoilRoot>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
