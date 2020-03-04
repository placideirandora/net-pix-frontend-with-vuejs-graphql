import Vue from 'vue';
import Vuex from 'vuex';
import { apolloClient } from '../graphql/vue-apollo';
import { GET_POSTS } from '../graphql/queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    error: ''
  },
  mutations: {
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
          commit('setError', message);
        });
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    error: state => state.error
  },
  modules: {}
});
