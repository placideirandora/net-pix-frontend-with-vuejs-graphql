<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap v-if="infiniteScrollPosts">
      <v-flex xs12 sm6 v-for="post in infiniteScrollPosts.posts" :key="post._id">
        <v-card hover class="text-uppercase">
          <v-img class="white--text align-end" height="30vh" :src="post.imageUrl" lazy />
          <v-card-actions>
            <v-card-title>
              <div>
                <div class="caption">{{ post.title }}</div>
                <span
                  class="grey--text caption"
                >{{ post.likes }} Likes - {{ post.messages.length }} Comments</span>
              </div>
            </v-card-title>
            <v-spacer />
            <v-btn icon @click="showExcerpt = !showExcerpt">
              <v-icon>{{ showExcerpt ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand v-if="showExcerpt">
            <v-card-text class="grey lighten-4">
              <v-list-item avatar>
                <v-list-item-avatar>
                  <v-img :src="post.createdBy.avatar" alt="Author Avatar" />
                </v-list-item-avatar>
                <v-list-item-content class="caption">
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
          </v-expand>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="showMoreEnabled" column>
      <v-flex xs12>
        <v-layout justify-center row>
          <v-btn :color="colors.secondary" @click="showMorePosts" dark class="mt-4">Show more posts</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { INFINITE_SCROLL_POSTS } from '../../graphql/queries';

const pageSize = 2;

export default {
  name: 'Posts',
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true,
      showExcerpt: false
    };
  },
  computed: {
    ...mapGetters(['colors'])
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
          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>
