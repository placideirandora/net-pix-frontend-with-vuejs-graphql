<template>
  <v-container>
    <v-row v-if="this.$apollo.loading">
      <v-col>
        <ContentLoader />
      </v-col>
    </v-row>

    <v-row v-else-if="infiniteScrollPosts.posts.length">
      <v-col
        v-for="post in infiniteScrollPosts.posts"
        :key="post._id"
        sm="10"
        md="6"
        lg="6"
        xl="4"
        :class="breakPoint.smAndDown ? 'mx-auto' : null"
      >
        <v-card hover class="text-uppercase">
          <v-img
            class="white--text align-end"
            height="30vh"
            :src="post.imageUrl"
            @click.native="goToPost(post._id)"
          />
          <v-card-actions>
            <v-card-title>
              <div>
                <div class="body-1">{{ post.title }}</div>
                <span
                  class="grey--text body-1"
                >{{ post.likes > 0 ? ( post.likes === 1 ? '1 Like' : `${post.likes} Likes` ) : '0 likes' }} - {{ post.messages.length > 0 ? ( post.messages.length === 1 ? '1 Comment' : `${post.messages.length} comments` ) : '0 comments' }}</span>
              </div>
            </v-card-title>
            <v-spacer />
            <v-btn icon @click="showExcerpt = !showExcerpt">
              <v-icon>{{ showExcerpt ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-menu-transition transition="slide-y-transition" v-if="showExcerpt">
            <v-card-text :class="!darkTheme ? 'grey lighten-4' : null">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="post.createdBy.avatar" alt="Author Avatar" />
                </v-list-item-avatar>
                <v-list-item-content class="body-1">
                  <v-list-item-title class="text--primary">{{ post.createdBy.username }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-light"
                  >Published on {{post.createdDate.slice(0, 21)}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-card-text>
          </v-menu-transition>
        </v-card>
      </v-col>
      <v-col v-if="infiniteScrollPosts.hasMore">
        <v-layout justify-center>
          <v-btn :color="colors.secondary" @click="showMorePosts" dark class="mt-4">Show more posts</v-btn>
        </v-layout>
      </v-col>
    </v-row>

    <v-row v-else-if="!infiniteScrollPosts.posts.length">
      <v-col>
        <DataNotFound message="There are currently no published posts to display" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { INFINITE_SCROLL_POSTS } from '../../graphql/queries';

const pageSize = 4;

export default {
  name: 'Posts',
  data() {
    return {
      pageNum: 1,
      showExcerpt: false
    };
  },
  computed: {
    ...mapGetters(['colors', 'darkTheme']),
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    },
    goToPost(id) {
      this.$router.push({ name: 'Post', params: { postId: id } });
    }
  }
};
</script>
