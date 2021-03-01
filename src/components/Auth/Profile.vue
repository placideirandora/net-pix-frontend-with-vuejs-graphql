<template>
  <v-container class="text-xs-center">
    <ContentLoader v-if="loadingProfile" />
    <div v-else>
      <!-- User Details Card -->
      <v-flex sm6 offset-sm3>
        <v-card class="white--text" color="secondary">
          <v-layout>
            <v-flex xs-5 class="pt-5">
              <v-img height="125px" contain :src="user.avatar"></v-img>
            </v-flex>
            <v-flex xs-7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ user.username }}</div>
                  <div class="font-weight-regular">
                    Joined:
                    {{
                      new Date(user.joinDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }}
                  </div>
                  <div class="hidden-xs-only font-weight-regular">
                    {{ user.favorites.length }} Favorites
                  </div>
                  <div class="hidden-xs-only font-weight-regular">
                    {{ userPosts.length }} Posts Added
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- Posts Favorited by the User -->
      <v-layout row wrap v-if="!userFavorites.length" class="mt-5">
        <v-flex xs-12>
          <h3 class="text-center">
            You have no favorited posts currently. Go and add some!
          </h3>
        </v-flex>
      </v-layout>

      <v-container class="mt-5" v-else>
        <v-flex xs-12 class="mb-5">
          <h2 class="font-weight-light text-center">
            Favorited
            <span class="font-weight-regular"
              >({{ userFavorites.length }})</span
            >
          </h2>
        </v-flex>

        <v-layout row wrap>
          <v-flex xs6 v-for="favorite in userFavorites" :key="favorite._id">
            <v-card class="mt-3 ml-1 mr-2" hover>
              <v-img height="30vh" :src="favorite.imageUrl"></v-img>
              <v-card-text>
                {{ favorite.title }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Posts Created by the User -->
      <v-container v-if="!userPosts.length">
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="text-center mt-3">You have no posts currently. Go and add some!</h3>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container class="mt-3" v-else>
        <v-flex xs-12>
          <h2 class="font-weight-light">
            Your Posts
            <span class="font-weight-regular">({{ userPosts.length }})</span>
          </h2>
        </v-flex>

        <v-layout row wrap>
          <v-flex xs12 sm6 v-for="post in userPosts" :key="post._id">
            <v-card class="mt-3 ml-1 mr-2" hover>
              <div class="px-4 py-4">
                <v-btn color="info" floating fab small dark class="mr-5">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn color="error" floating fab small dark>
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>

              <v-img height="30vh" :src="post.imageUrl"></v-img>
              <v-card-text>{{ post.title }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['user', 'userPosts', 'userFavorites', 'loadingProfile']),
  },
  methods: {
    getUserPosts() {
      const userId = localStorage.getItem('netPixUserId');

      this.$store.dispatch('getUserPosts', { userId });
    },
  },
  created() {
    this.getUserPosts();
  },
};
</script>
