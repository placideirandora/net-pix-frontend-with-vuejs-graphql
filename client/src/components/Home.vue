<template>
  <v-container class="home">
    <h1>HOME</h1>
    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{ result: { error, loading, data } }">
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-else-if="loading">Loading</div>
        <div v-else-if="data.getPosts.length">
          <ul v-for="post in data.getPosts" :key="post._id">
            <li>{{ post.title }}</li>
            <li>{{ post.description }}</li>
          </ul>
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