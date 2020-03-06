<template>
  <v-container class="home">
    <div v-if="loading" class="home__loader">
      <ContentLoader />
    </div>
    <div v-else-if="!loading && error" class="home__error">
      <ServerError />
    </div>
    <div v-else-if="!loading && posts.length > 0">
      <v-flex xs12>
        <v-carousel v-bind="{ 'cycle': true }" interval="5000">
          <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
            <h2 class="home__title">{{ post.title }}</h2>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </div>
    <div v-else>No Posts</div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ContentLoader from '../components/Helpers/ContentLoader';
import ServerError from '../components/Helpers/ServerError';

export default {
  name: 'Home',
  components: {
    ContentLoader,
    ServerError
  },
  computed: {
    ...mapGetters(['loading', 'posts', 'error'])
  },
  methods: {
    handleGetCarouselPosts() {
      this.$store.dispatch('getPosts');
    }
  },
  created() {
    this.handleGetCarouselPosts();
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

  &__loader {
    margin-top: 6rem;
  }

  &__error {
    text-align: center;
    margin-top: 5rem;
  }
}
</style>