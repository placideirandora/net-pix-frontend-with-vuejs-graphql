<template>
  <v-container class="home">
    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{ result: { error, loading, data } }">
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-else-if="loading">Loading</div>
        <div v-else-if="data.getPosts.length">
          <v-flex xs12>
            <v-carousel v-bind="{ 'cycle': true }" interval="4000">
              <v-carousel-item v-for="post in data.getPosts" :key="post._id" :src="post.imageUrl">
                <h2 class="home__title">{{ post.title }}</h2>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </div>
        <div v-else-if="!data.getPosts.length">No Posts</div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { queries } from '../graphql/queries';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      getPostsQuery: queries.getPosts
    };
  }
};
</script>

<style lang="scss">
.home {
  &__title {
    position: absolute;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: #f9f9f9;
    padding: 0.4em;
    bottom: 50px;
    left: 0;
    right: 0;
    text-transform: uppercase;
  }
}
</style>