<template>
  <v-container class="app text-center text-uppercase">
    <img src="../../assets/auth.svg" alt="authentication" width="300" height="200" />
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="app__title">Welcome Back</h1>
        <FormAlert :message="formError" type="error" color="error" v-if="formError" />
      </v-flex>
    </v-layout>
    <v-card width="750" class="mx-auto" :color="colors.formBackground">
      <v-card-text>
        <v-form v-model="isFormValid" lazy-validation ref="form">
          <v-text-field
            :color="colors.secondary"
            :rules="usernameRules"
            label="Username"
            prepend-icon="mdi-account-circle"
            :clearable="true"
            v-model="username"
            autocomplete="off"
          />
          <v-text-field
            :color="colors.secondary"
            :rules="passwordRules"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :clearable="true"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          class="ma-2"
          :color="colors.secondary"
          dark
          :loading="loading"
          :disabled="!isFormValid"
          @click="handleSigninUser"
        >
          Continue
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
          <v-icon dark right>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer />
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
      showPassword: false,
      usernameRules: [
        username => !!username || 'Username is required',
        username =>
          (username.length >= 4 && username.length <= 20) ||
          'Username cannot be less than 4 characters'
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password =>
          password.length >= 6 || 'Password must be at least 6 characters'
      ],
      isFormValid: true
    };
  },
  computed: {
    ...mapGetters(['colors', 'loading', 'user', 'formError'])
  },
  watch: {
    user() {
      this.$router.push({ name: 'Home' });
    }
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        const credentials = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch('signinUser', credentials);
      }
    }
  },
  mounted() {
    if (this.formError) {
      this.$store.commit('clearFormError', null);
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  &__title {
    margin-bottom: 0.2rem;
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>