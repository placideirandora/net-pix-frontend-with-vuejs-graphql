<template>
  <v-container class="home">
    <v-row v-if="loading" class="home__loader">
      <v-col>
        <ContentLoader />
      </v-col>
    </v-row>

    <v-row v-else-if="!loading && pageError">
      <v-col>
        <ServerError :message="pageError" />
      </v-col>
    </v-row>

    <v-row v-else-if="!loading && posts.length > 0">
      <v-col sm="11" md="12" lg="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-carousel v-bind="{ 'cycle': true }" interval="5000">
          <v-carousel-item
            v-for="post in posts"
            :key="post._id"
            :src="post.imageUrl"
            @click.native="goToPost(post._id)"
          >
            <h1 class="home__title" v-if="!breakPoint.xsOnly">{{ post.title.toUpperCase() }}</h1>
            <h2 class="home__title" v-if="breakPoint.xsOnly">{{ post.title.toUpperCase() }}</h2>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <ServerError :message="pageError" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ContentLoader from '../components/Shared/ContentLoader';
import ServerError from '../components/Shared/ServerError';

export default {
  name: 'Home',
  components: {
    ContentLoader,
    ServerError
  },
  computed: {
    ...mapGetters(['loading', 'posts', 'pageError', 'authError']),
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  },
  methods: {
    handleGetCarouselPosts() {
      this.$store.dispatch('getPosts');
    },
    goToPost(id) {
      this.$router.push({ name: 'Post', params: { postId: id } });
    }
  },
  created() {
    this.handleGetCarouselPosts();
  },
  mount() {
    if (this.authError) {
      this.$store.commit('clearAuthError', null);
    }
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
}
</style>