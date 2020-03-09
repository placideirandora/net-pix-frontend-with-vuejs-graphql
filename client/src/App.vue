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
        <v-btn color="#004385" v-if="user" @click="handleSignoutUser">
          <v-icon left lass="hidden-xs-only">mdi-logout-variant</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container>
        <transition name="fade">
          <router-view />
        </transition>
        <v-snackbar :color="colorType" bottom left :timeout="5000" v-model="authSnackbar">
          <v-icon class="mr-3" color="white">{{ icon }}</v-icon>
          <h3>{{ notification }}</h3>
          <v-btn @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar color="success" bottom left :timeout="5000" v-model="postSnackbar">
          <v-icon class="mr-3" color="white">mdi-check-circle</v-icon>
          <h3>You have published the post.</h3>
          <v-btn @click="postSnackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
          color="warning"
          bottom
          left
          :timeout="8000"
          v-model="authErrorSnackbar"
          v-if="authError"
        >
          <v-icon class="mr-3" color="white">mdi-alert-circle</v-icon>
          <h3>{{ authError }}</h3>
          <v-btn @click="authErrorSnackbar = false">Close</v-btn>
        </v-snackbar>
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
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      postSnackbar: false,
      notification: null,
      colorType: null,
      icon: null
    };
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.icon = 'mdi-check-circle';
        this.colorType = 'success';
        this.notification = 'You are now signed in.';
        this.authSnackbar = true;
      } else {
        this.icon = 'mdi-information';
        this.colorType = 'info';
        this.notification = 'You are now signed out.';
        this.authSnackbar = true;
      }
    },
    published(newValue) {
      if (newValue) {
        this.postSnackbar = true;
      }
    },
    authError(newValue) {
      if (newValue) {
        localStorage.removeItem('token');
        this.authErrorSnackbar = true;

        const {
          history: {
            current: { name }
          }
        } = this.$router;

        name !== 'SignIn' ? this.$router.push({ name: 'SignIn' }) : null;
      }
    }
  },
  computed: {
    ...mapGetters(['colors', 'user', 'authError', 'published']),
    horizontalNavItems() {
      let items = [
        { icon: 'mdi-message', title: 'Posts', link: '/posts' },
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
        { icon: 'mdi-message', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ];
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
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