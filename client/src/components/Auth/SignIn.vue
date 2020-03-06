<template>
  <v-container class="app text-center text-uppercase">
    <img src="../../assets/auth.svg" alt="authentication" width="300" height="200" />
    <h1 class="app__title">Welcome Back</h1>
    <v-card width="750" class="mx-auto">
      <v-card-text>
        <v-form>
          <v-text-field
            :color="colors.secondary"
            label="Username"
            prepend-icon="mdi-account-circle"
            v-model="username"
          />
          <v-text-field
            :color="colors.secondary"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="ma-2" :color="colors.secondary" dark @click="handleSigninUser">
          Continue
          <v-icon dark right>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-container class="text-right caption">
          <router-link
            to="/signup"
            tag="span"
            class="app__router mr-2"
          >Don't Have An Account? Sign Up</router-link>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    };
  },
  computed: {
    ...mapGetters(['colors', 'user'])
  },
  watch: {
    user() {
      this.$router.push({ name: 'Home' });
    }
  },
  methods: {
    handleSigninUser() {
      const credentials = { username: this.username, password: this.password };
      this.$store.dispatch('signinUser', credentials);
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  &__title {
    margin-bottom: 1.5rem;
  }
}
</style>