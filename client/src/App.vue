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

        <Notification
          :message="notification"
          :messageType="type"
          v-if="authSnackbarIn"
          :icon="icon"
          :duration="4000"
        />

        <Notification
          :message="notification"
          :messageType="type"
          v-if="authSnackbarOut"
          :icon="icon"
          :duration="4000"
        />

        <Notification
          :message="notification"
          :messageType="type"
          v-if="published"
          :icon="icon"
          :duration="5000"
        />

        <Notification
          :message="authError"
          :messageType="type"
          v-if="authError"
          :icon="icon"
          :duration="5000"
        />
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
      authErrorSnackbarIn: false,
      authErrorSnackbarOut: false,
      postSnackbar: false,
      notification: null,
      type: null,
      icon: null,
      badgeAnimated: false
    };
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.icon = 'mdi-check-circle';
        this.type = 'success';
        this.notification = 'You have successfully signed in.';
        this.authSnackbarIn = true;
      } else {
        this.icon = 'mdi-information';
        this.type = 'info';
        this.notification = 'You have successfully signed out.';
        this.authSnackbarOut = true;
      }
    },
    published(newValue) {
      if (newValue) {
        this.postSnackbar = true;
        this.notification = 'You have successfully published the post.';
        this.icon = 'mdi-check-circle';
        this.type = 'success';
      }
    },
    authError(newValue) {
      if (newValue) {
        localStorage.removeItem('token');
        this.authErrorSnackbar = true;
        this.icon = 'mdi-alert-circle';
        this.type = 'warning';

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