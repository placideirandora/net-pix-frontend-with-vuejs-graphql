<template>
  <v-app class="app">
    <v-toolbar fixed dark class="app__toolbar" style="background: #004385;">
      <v-app-bar-nav-icon @click="toggleSideNav" class="ml-1 mr-4" />
      <!-- Implement The Navigation Drawer -->
      <v-toolbar-title class="hidden-xs-only title">
        <router-link to="/" tag="span" class="app__router">NETPIX</router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search posts"
        color="accent"
        single-line
        high-details
        class="mt-4"
      />
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          style="background: #004385;"
          v-for="(item, index) in horizontalNavItems"
          :key="index"
          :to="item.link"
        >
          <v-icon left class="hidden-xs-only">{{ item.icon }}</v-icon>
          {{ item.title }}
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
export default {
  name: 'App',
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
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
  background: #f9f9f9;
  &__toolbar {
    max-height: 4.2rem;
  }
  &__router {
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
}
</style>
