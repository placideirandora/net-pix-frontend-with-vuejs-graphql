import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { onError } from 'apollo-link-error';
import {
  createApolloClient,
  restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client';

import router from '../router/index';

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = 'netPixAuthToken';
const AUTH_USER_ID = 'netPixUserId';

// Http endpoint
const httpEndpoint = 'http://localhost:4000/graphql';

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ name }) => {
      if (name === 'AuthenticationError') {
        console.log(`[Authentication error]: ${networkError}`);
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  tokenName: AUTH_TOKEN,
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('netPixAuthToken');
    operation.setContext({
      headers: {
        authorization: token ? token : ''
      }
    });
  },
  link
};

// Create apollo client
export const { apolloClient } = createApolloClient({
  ...defaultOptions
});

// Call this in the Vue app file
export const createProvider = () => {
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      );
    }
  });

  return apolloProvider;
};

// Manually call this when user log in
export const onLogin = async (apolloClient, token, userId) => {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(AUTH_USER_ID, userId);
  }

  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);

  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message);
  }
};

// Manually call this when user log out
export const onLogout = async apolloClient => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER_ID);
  }

  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);

  try {
    await apolloClient.resetStore();
    const {
      history: {
        current: { name }
      }
    } = router;

    name !== 'Home' ? router.push({ name: 'Home' }) : null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
};
