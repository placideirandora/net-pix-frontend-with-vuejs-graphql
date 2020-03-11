<template>
  <v-container v-if="getPost" flexbox center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout>
          <h1>{{ getPost.title.toUpperCase() }}</h1>
          <v-spacer />
          <v-icon :color="colors.secondary" large @click="goToPreviousPage">mdi-arrow-left-circle-outline</v-icon>
        </v-layout>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-img
              v-on="on"
              class="white--text align-end"
              height="45vh"
              :src="getPost.imageUrl"
              @click="toggleImageDialog"
            />
          </template>
          <span>Click to enlarge image</span>
        </v-tooltip>
        <v-dialog v-model="dialog">
          <v-img max-height="80vh" :src="getPost.imageUrl" />
        </v-dialog>
        <v-layout>
          <span v-for="(category,index) in getPost.categories" :key="index">
            <v-chip
              class="mb-3 mr-2 mt-3"
              :color="colors.secondary"
              text-color="white"
            >{{ category }}</v-chip>
          </span>
          <v-spacer />
          <h4 class="mt-3 font-weight-thin text-right">{{ getPost.likes }} Likes</h4>
          <v-btn large icon v-if="user" class="ml-5">
            <v-icon large style="font-size: 30px;" :color="favorite ? 'error' : 'grey'">mdi-heart-circle-outline</v-icon>
          </v-btn>
        </v-layout>
        <v-layout>
          <p class="body-1">{{ getPost.description }}</p>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_POST } from '../../graphql/queries';

export default {
  name: 'Post',
  props: ['postId'],
  data() {
    return {
      dialog: false,
      favorite: false
    };
  },
  computed: {
    ...mapGetters(['user', 'colors'])
  },
  methods: {
    goToPreviousPage() {
      this.$router.go(-1);
    },
    toggleImageDialog() {
      this.dialog = !this.dialog;
    }
  },
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId
        };
      }
    }
  }
};
</script> 

