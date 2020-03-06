import Vue from 'vue';
import Vuex from 'vuex';
import { apolloClient, onLogin } from '../graphql/vue-apollo';
import { GET_POSTS, GET_CURRENT_USER } from '../graphql/queries';
import { LOGIN_USER } from '../graphql/mutations';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    loading: false,
    error: '',
    colors: {
      primary: '#004385',
      secondary: '#457EAC'
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data: { getCurrentUser } }) => {
          commit('setUser', getCurrentUser);
        })
        .catch(({ message }) => {
          console.log(message.slice(15));
        });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data: { getPosts } }) => {
          commit('setPosts', getPosts);
          commit('setLoading', false);
        })
        .catch(({ message }) => {
          commit('setLoading', false);
          commit('setError', message.slice(15));
        });
    },
    signinUser: (_, payload) => {
      apolloClient
        .mutate({
          mutation: LOGIN_USER,
          variables: payload
        })
        .then(
          ({
            data: {
              loginUser: { token }
            }
          }) => {
            onLogin(apolloClient, token);
            router.go();
          }
        )
        .catch(({ message }) => {
          console.log(message.slice(15));
        });
    }
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts,
    loading: state => state.loading,
    error: state => state.error,
    colors: state => state.colors
  },
  modules: {}
});
