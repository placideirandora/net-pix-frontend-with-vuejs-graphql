<template>
  <v-app-bar app dark :color="colors.primary">
    <v-app-bar-nav-icon class="ml-1 mr-4" />
    <!-- Implement The Navigation Drawer -->
    <v-toolbar-title :class="breakPoint.smAndDown ? 'title app__title--center' : 'title'">
      <router-link to="/" tag="span" class="app__router">NETPIX</router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-text-field
      flex
      prepend-icon="search"
      placeholder="SEARCH POSTS"
      single-line
      high-details
      :class="breakPoint.smAndDown ? 'hidden-xs-only hidden-sm-only' : 'mt-4'"
      clearable
    />
    <v-spacer />
    <v-toolbar-items class="hidden-xs-only">
      <v-btn color="#004385" v-for="(menu, index) in navMenus" :key="index" :to="menu.link">
        <v-icon left class="hidden-xs-only">{{ menu.icon }}</v-icon>
        {{ menu.title }}
      </v-btn>
      <v-btn color="#004385" to="/profile" v-if="user && !userFavorites.length">
        <v-icon left class="hidden-xs-only">mdi-account-box</v-icon>Profile
      </v-btn>
      <v-btn color="#004385" to="/profile" v-if="user && userFavorites.length">
        <v-icon left class="hidden-xs-only">mdi-account-box</v-icon>
        <v-badge right color="blue darken-2" :class="{'app__bounce' : badgeAnimated}">
          <span slot="badge" v-if="userFavorites.length">{{ userFavorites.length }}</span>
          Profile
        </v-badge>
      </v-btn>
      <v-btn color="#004385" v-if="user" @click="signoutUser">
        <v-icon left lass="hidden-xs-only">mdi-logout-variant</v-icon>Sign Out
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  props: {
    navMenus: {
      type: Array,
      required: true
    },
    badgeAnimated: {
      type: Boolean,
      required: true
    },
    signoutUser: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters(['colors', 'user', 'userFavorites']),
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  }
};
</script>

<style lang="scss">
  .app {
    &__title {
      &--center {
        margin-left: calc(100% - 19rem);
      }
    }
  }
</style>