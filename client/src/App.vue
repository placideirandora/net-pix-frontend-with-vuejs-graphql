<template>
  <v-app class="app">
    <v-toolbar fixed dark class="app__toolbar" :color="colors.primary">
      <v-app-bar-nav-icon @click="toggleSideNav" class="ml-1 mr-4" />
      <!-- Implement The Navigation Drawer -->
      <v-toolbar-title class="hidden-xs-only title">
        <router-link to="/" tag="span" class="app__router">NETPIX</router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="SEARCH POSTS"
        single-line
        high-details
        class="mt-4"
      />
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          color="#004385"
          v-for="(item, index) in horizontalNavItems"
          :key="index"
          :to="item.link"
        >
          <v-icon left class="hidden-xs-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn color="#004385" v-if="user">
          <v-icon left lass="hidden-xs-only">mdi-logout-variant</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(['colors', 'user']),
    horizontalNavItems() {
      let items = [
        { icon: 'mdi-post', title: 'Posts', link: '/posts' },
        { icon: 'mdi-login-variant', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-account-plus', title: 'Sign Up', link: '/signup' }
      ];

      if (this.user) {
        items = [
          { icon: 'mdi-message', title: 'Posts', link: '/posts' },
          { icon: 'mdi-message-plus', title: 'Add Post', link: '/add-post' },
          { icon: 'mdi-account-box', title: 'profile', link: '/profile' }
        ];
      }

      return items;
    },
    sideNavItems() {
      return [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style lang="scss">
.app {
  &__toolbar {
    max-height: 4.2rem;
  }
  &__router {
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-property: all;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(-25px);
  }
}
</style>