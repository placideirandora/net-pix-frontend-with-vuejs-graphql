import Vue from 'vue';
import Vuex from 'vuex';
import { apolloClient } from '../graphql/vue-apollo';
import { queries } from '../graphql/queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      apolloClient
        .query({
          query: queries.getPosts
        })
        .then(({ data: { getPosts } }) => {
          commit('setPosts', getPosts);
        })
        .catch(({ message }) => {
          console.log('Error: ', message);
        });
    }
  },
  getters: {
    posts: state => state.posts
  },
  modules: {}
});
