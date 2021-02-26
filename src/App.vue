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

        <v-layout>
          <v-spacer />
          <div class="app__theme">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab v-on="on" @click="toggleTheme">
                  <v-icon>mdi-brightness-6</v-icon>
                </v-btn>
              </template>
              <span>{{
                !darkTheme ? 'Switch to Dark Theme' : 'Switch to Light Theme'
              }}</span>
            </v-tooltip>
          </div>
        </v-layout>
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
    Footer,
  },
  data() {
    return {
      sideNav: false,
      authSnackbarIn: false,
      authSnackbarOut: false,
      postSnackbar: false,
      notification: null,
      type: null,
      icon: null,
      badgeAnimated: false,
    };
  },
  watch: {
    userFavorites(newValue) {
      if (newValue) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    },
  },
  computed: {
    ...mapGetters([
      'colors',
      'user',
      'authError',
      'published',
      'userFavorites',
    ]),
    horizontalNavMenus() {
      let menus = [
        { icon: 'mdi-message', title: 'Posts', link: '/posts' },
        { icon: 'mdi-login-variant', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-account-plus', title: 'Sign Up', link: '/signup' },
      ];

      if (this.user) {
        menus = [
          { icon: 'mdi-message', title: 'Posts', link: '/posts' },
          {
            icon: 'mdi-message-plus',
            title: 'Publish Post',
            link: '/add-post',
          },
        ];
      }

      return menus;
    },
    sideNavItems() {
      return [
        { icon: 'mdi-message', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' },
      ];
    },
    darkTheme() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    // Implement side nav
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        this.$store.commit('setDarkTheme', true);
        localStorage.setItem('theme', 'dark');
      } else {
        this.$store.commit('setDarkTheme', false);
        localStorage.setItem('theme', 'light');
      }
    },
  },
};
</script>

<style lang="scss">
.app {
  &__router {
    cursor: pointer;
  }

  &__theme {
    position: fixed;
    bottom: 10%;
    right: 2.5%;
    z-index: 1;
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