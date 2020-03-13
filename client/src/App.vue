<template>
  <v-app class="app">
    <NavBar
      :navMenus="horizontalNavMenus"
      :badgeAnimated="badgeAnimated"
      :signoutUser="handleSignoutUser"
    />
    <v-content>
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
          <v-icon class="mr-3" color="white">mdi-c`ck-circle</v-icon>
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
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './components/Shared/NavBar';
import Footer from './components/Shared/Footer';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      postSnackbar: false,
      notification: null,
      colorType: null,
      icon: null,
      badgeAnimated: false
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
    },
    userFavorites(newValue) {
      if (newValue) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    }
  },
  computed: {
    ...mapGetters([
      'colors',
      'user',
      'authError',
      'published',
      'userFavorites'
    ]),
    horizontalNavMenus() {
      let menus = [
        { icon: 'mdi-message', title: 'Posts', link: '/posts' },
        { icon: 'mdi-login-variant', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-account-plus', title: 'Sign Up', link: '/signup' }
      ];

      if (this.user) {
        menus = [
          { icon: 'mdi-message', title: 'Posts', link: '/posts' },
          {
            icon: 'mdi-message-plus',
            title: 'Publish Post',
            link: '/add-post'
          }
        ];
      }

      return menus;
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
    // Implement side nav
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
  &__router {
    cursor: pointer;
  }

  &__bounce {
    animation: bounce 1s both;
  }

  @keyframes bounce {
    0%,
    20%,
    30%,
    53%,
    80%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      transform: translate3d(0, -30%, 0);
    }
    70% {
      transform: translate3d(0, -20%, 0);
    }
    90% {
      transform: translate3d(0, -6px, 0);
    }
  }
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
</style>