import Vue from 'vue';
import Vuex from 'vuex';
import { apolloClient, onLogin, onLogout } from '../graphql/apolloClient';
import { GET_POSTS, GET_CURRENT_USER } from '../graphql/queries';
import { REGISTER_USER, LOGIN_USER, PUBLISH_POST } from '../graphql/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    published: false,
    posts: [],
    loading: false,
    pageError: null,
    formError: null,
    authError: null,
    colors: {
      primary: '#004385',
      secondary: '#457EAC',
      formBackground: '#BFBDBF'
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setPublished: (state, payload) => {
      state.published = payload;
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setPageError: (state, payload) => {
      state.pageError = payload;
    },
    setFormError: (state, payload) => {
      state.formError = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearPageError: state => (state.pageError = null),
    clearFormError: state => (state.formError = null),
    clearAuthError: state => (state.authError = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      const token = localStorage.getItem('token');
      if (token) {
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
      }
    },
    getPosts: ({ commit }) => {
      commit('clearPageError', null);
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
          commit('setPageError', message);
        });
    },
    publishPost: ({ commit }, payload) => {
      commit('clearPageError', null);
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: PUBLISH_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            const data = cache.readQuery({ query: GET_POSTS });
            data.getPosts.unshift(addPost);
            cache.writeQuery({ query: GET_POSTS, data });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload
            }
          }
        })
        .then(() => {
          commit('setPublished', true);
        })
        .catch(({ message }) => {
          commit('setLoading', false);
          commit('setPageError', message);
        });
    },
    signupUser: ({ commit }, payload) => {
      commit('clearFormError', null);
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: REGISTER_USER,
          variables: payload
        })
        .then(
          ({
            data: {
              registerUser: { token }
            }
          }) => {
            commit('setLoading', false);
            onLogin(apolloClient, token);
          }
        )
        .catch(({ message }) => {
          commit('setLoading', false);
          commit('setFormError', message.slice(15));
        });
    },
    signinUser: ({ commit }, payload) => {
      commit('clearFormError', null);
      commit('setLoading', true);
      // Prevent malformed token error
      localStorage.setItem('token', '');

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
            commit('setLoading', false);
            onLogin(apolloClient, token);
          }
        )
        .catch(({ message }) => {
          commit('setLoading', false);
          commit('setFormError', message.slice(15));
        });
    },
    signoutUser: ({ commit }) => {
      commit('clearUser');
      onLogout(apolloClient);
    }
  },
  getters: {
    user: state => state.user,
    published: state => state.published,
    posts: state => state.posts,
    loading: state => state.loading,
    colors: state => state.colors,
    authError: state => state.authError,
    pageError: state => state.pageError,
    formError: state => state.formError,
    userFavorites: state => state.user && state.user.favorites
  },
  modules: {}
});
