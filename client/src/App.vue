<template>
  <v-app class="app">
    <v-toolbar fixed color="primary" dark class="app__toolbar">
      <v-app-bar-nav-icon />
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
          color="primary"
          flat
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left class="hidden-xs-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container>
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    horizontalNavItems: () => {
      return [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
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
}
</style>