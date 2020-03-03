<template>
  <v-container class="home">
    <div v-if="posts.length">
      <v-flex xs12>
        <v-carousel v-bind="{ 'cycle': true }" interval="4000">
          <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
            <h2 class="home__title">{{ post.title }}</h2>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
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
}
</style>