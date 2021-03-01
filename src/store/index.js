import Vue from 'vue';
import Vuex from 'vuex';

import { apolloClient, onLogin, onLogout } from '../graphql/apolloClient';
import {
  GET_POSTS,
  GET_CURRENT_USER,
  SEARCH_POSTS,
  GET_USER_POSTS
} from '../graphql/queries';
import { REGISTER_USER, LOGIN_USER, PUBLISH_POST } from '../graphql/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    userPosts: [],
    searchResults: [],
    loading: false,
    searching: false,
    postsNotFound: false,
    darkTheme: false,
    colors: {
      primary: '#004385',
      secondary: '#457EAC',
      backgroundLight: '#BFBDBF',
      backgroundDark: '#312F2F'
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload;
    },
    setSearchResults: (state, payload) => {
      state.searchResults = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setSearching: (state, payload) => {
      state.searching = payload;
    },
    setPostsNotFound: (state, payload) => {
      state.postsNotFound = payload;
    },
    setDarkTheme: (state, payload) => {
      state.darkTheme = payload;
    },
    clearUser: state => (state.user = null),
    clearSearchResults: state => (state.searchResults = [])
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
          .catch(() => {
            Vue.$toast.error('Your session has expired. Sign In again.');
            onLogout(apolloClient);
          });
      }
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
        .catch(() => {
          commit('setLoading', false);
        });
    },
    getUserPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: GET_USER_POSTS,
          variables: payload
        })
        .then(({ data: { getUserPosts } }) => {
          console.log('USER POSTS: ', getUserPosts);
          
          if (getUserPosts.length) {
            commit('setUserPosts', getUserPosts);
          }
        })
        .catch(() => {
          // commit('setLoading', false);
        });
    },
    publishPost: ({ commit }, payload) => {
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
          Vue.$toast.error(message);
        });
    },
    searchPosts: ({ commit }, payload) => {
      commit('clearSearchResults');
      commit('setSearching', true);

      return new Promise((resolve, reject) => {
        apolloClient
          .query({
            query: SEARCH_POSTS,
            variables: payload
          })
          .then(({ data: { searchPosts } }) => {
            commit('setSearching', false);

            if (searchPosts.length) {
              commit('setSearchResults', searchPosts);
              resolve(searchPosts);
            } else {
              commit('setPostsNotFound', true);
            }
          })
          .catch(error => {
            commit('setSearching', false);
            reject(error);
          });
      });
    },
    signupUser: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
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
              resolve(true);
            }
          )
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },
    signinUser: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
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
              resolve(true);
            }
          )
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },
    signoutUser: ({ commit }) => {
      commit('clearUser');
      onLogout(apolloClient);
      Vue.$toast.info('Signed Out');
    }
  },
  getters: {
    user: state => state.user,
    published: state => state.published,
    posts: state => state.posts,
    userPosts: state => state.userPosts,
    loading: state => state.loading,
    searching: state => state.searching,
    colors: state => state.colors,
    authError: state => state.authError,
    pageError: state => state.pageError,
    formError: state => state.formError,
    darkTheme: state => state.darkTheme,
    searchResults: state => state.searchResults,
    postsNotFound: state => state.postsNotFound,
    userFavorites: state => state.user && state.user.favorites
  },
  modules: {}
});
