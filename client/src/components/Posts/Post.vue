<template>
  <v-container v-if="getPost" flexbox center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout>
          <h1>{{ getPost.title.toUpperCase() }}</h1>
          <v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                :color="colors.secondary"
                large
                @click="goToPreviousPage"
              >mdi-arrow-left-circle</v-icon>
            </template>
            <span>Go back</span>
          </v-tooltip>
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
          <h4
            class="mt-3 font-weight-thin text-right"
          >{{ getPost.likes > 0 ? ( getPost.likes === 1 ? '1 Like' : `${getPost.likes} Likes` ) : '0 Likes' }}</h4>
          <v-btn large icon v-if="user" class="ml-5">
            <v-icon
              large
              style="font-size: 24px;"
              :color="checkIfPostLiked(getPost._id) ? colors.secondary : 'grey'"
              @click="handleToggleLike"
            >mdi-thumb-up</v-icon>
          </v-btn>
        </v-layout>
        <v-layout>
          <p class="body-1">{{ getPost.description }}</p>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider />
    <v-layout row wrap>
      <v-flex xs12>
        <v-list-group subheader two-line>
          <v-subheader>{{ getPost.messages.length > 0 ? ( getPost.messages.length === 1 ? '1 Comment' : `${getPost.messages.length} comments` ) : '0 Comments' }}</v-subheader>
          <template v-for="message in getPost.messages">
            <v-divider :key="message._id" />
            <v-list-item inset :key="message.title">
              <v-list-item-avatar>
                <v-img :src="message.messageUser.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ message.messageBody }}</v-list-item-title>
                <v-list-item-subtitle>{{ message.messageUser.username.toUpperCase() }}</v-list-item-subtitle>
                <span
                  class="grey--text text--lighten-1 hidden-xs-only"
                >{{ message.messageDate.slice(0, 21) }}</span>
              </v-list-item-content>
              <v-list-item-action class="hidden-xs-only">
                <v-icon :color="checkIfOwnComment(message) ? colors.secondary : 'grey' ">mdi-chat</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>
      </v-flex>
    </v-layout>
    <v-layout class="mb-3" v-if="user">
      <v-flex xs12>
        <v-form
          v-model="isFormValid"
          lazy-validation
          ref="form"
          @submit.prevent="handleCommentOnPost"
        >
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                :color="colors.secondary"
                :rules="commentRules"
                clearable
                prepend-icon="mdi-comment-processing"
                :append-outer-icon="comment ? 'mdi-send-circle' : null"
                @click:append-outer="handleCommentOnPost"
                label="Add comment"
                v-model="comment"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout class="mt-4" v-if="!user">
      <v-flex xs12>
        <h5 class="text-uppercase grey--text">Sign in to like or comment on this post</h5>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_POST } from '../../graphql/queries';
import {
  ADD_POST_COMMENT,
  LIKE_POST,
  UNLIKE_POST
} from '../../graphql/mutations';

export default {
  name: 'Post',
  props: ['postId'],
  data() {
    return {
      dialog: false,
      liked: false,
      postLiked: false,
      isFormValid: true,
      comment: '',
      commentRules: [
        comment => !!comment || 'Comment is required',
        comment =>
          (comment.length > 0 && comment.length <= 200) ||
          'Comment should not exceed 200 characters'
      ]
    };
  },
  computed: {
    ...mapGetters(['user', 'colors', 'userFavorites'])
  },
  methods: {
    goToPreviousPage() {
      this.$router.go(-1);
    },
    toggleImageDialog() {
      this.dialog = !this.dialog;
    },
    checkIfPostLiked(postId) {
      if (
        this.userFavorites &&
        this.userFavorites.some(fav => fav._id === postId)
      ) {
        this.postLiked = true;
        return true;
      } else {
        this.postLiked = false;
        return false;
      }
    },
    checkIfOwnComment(comment) {
      return this.user && this.user._id === comment.messageUser._id;
    },
    handleToggleLike() {
      if (this.postLiked) {
        this.handleUnlikePost();
      } else {
        this.handleLikePost();
      }
    },
    handleLikePost() {
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo
        .mutate({
          mutation: LIKE_POST,
          variables,
          update: cache => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            });
            data.getPost.likes += 1;

            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            });
          }
        })
        .then(({ data: { likePost } }) => {
          const updatedUser = { ...this.user, favorites: likePost.favorites };
          this.$store.commit('setUser', updatedUser);
        })
        .catch(({ message }) => {
          console.log('MESSAGE: ', message);
        });
    },
    handleUnlikePost() {
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo
        .mutate({
          mutation: UNLIKE_POST,
          variables,
          update: cache => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            });
            data.getPost.likes -= 1;

            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            });
          }
        })
        .then(({ data: { unlikePost } }) => {
          const updatedUser = { ...this.user, favorites: unlikePost.favorites };
          this.$store.commit('setUser', updatedUser);
        })
        .catch(({ message }) => {
          console.log('MESSAGE: ', message);
        });
    },
    handleCommentOnPost() {
      if (this.$refs.form.validate()) {
        const variables = {
          commentBody: this.comment,
          postId: this.postId,
          userId: this.user._id
        };
        this.$apollo
          .mutate({
            mutation: ADD_POST_COMMENT,
            variables,
            update: (cache, { data: { addPostComment } }) => {
              const data = cache.readQuery({
                query: GET_POST,
                variables: { postId: this.postId }
              });
              data.getPost.messages.unshift(addPostComment);

              cache.writeQuery({
                query: GET_POST,
                variables: { postId: this.postId },
                data
              });
            }
          })
          .then(() => {
            this.$refs.form.reset();
          });
      }
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

