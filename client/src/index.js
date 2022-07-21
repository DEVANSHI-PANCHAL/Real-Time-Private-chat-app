import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const root = ReactDOM.createRoot(document.getElementById('root'));



const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwt') || "",
    }
  }
});


const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
 
);


reportWebVitals();
