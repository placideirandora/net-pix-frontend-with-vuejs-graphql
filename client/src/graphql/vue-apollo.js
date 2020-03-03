import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';

// Install the vue plugin
Vue.use(VueApollo);

// Http endpoint
const httpEndpoint = 'http://localhost:5000/graphql';

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint
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
