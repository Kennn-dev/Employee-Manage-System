import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import reportWebVitals from './reportWebVitals';


//css schedule
//
import { RecoilRoot } from 'recoil'

//aphollo client
import { 
  ApolloClient, 
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials : 'include',
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'same-origin'
      }
    })
  }
});
///

ReactDOM.render(
  <ApolloProvider client = {client}>
    
    <React.StrictMode>
        <CookiesProvider>
        <RecoilRoot>
          <App />
          </RecoilRoot>
        </CookiesProvider>
    </React.StrictMode>
    
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
