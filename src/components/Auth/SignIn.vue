<template>
  <v-container class="app text-center text-uppercase">
    <v-row>
      <v-col>
        <img
          src="../../assets/welcome.svg"
          alt="authentication"
          :width="breakPoint.smAndDown ? 250 : 500"
          height="200"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="app__title">Welcome Back</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="10" md="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-card
          width="750"
          class="mx-auto"
          :color="!darkTheme ? colors.backgroundLight : colors.backgroundDark"
        >
          <v-card-text>
            <v-form v-model="isFormValid" lazy-validation ref="form">
              <v-text-field
                :color="colors.secondary"
                :rules="usernameRules"
                label="Username"
                prepend-icon="mdi-account-circle"
                :clearable="breakPoint.xsOnly ? false : true"
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
                :clearable="breakPoint.xsOnly ? false : true"
                @click:append="onToggleShowPassword"
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
              @click="onSignUserIn"
            >
              Sign In
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </template>
              <v-icon dark right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-spacer />
            <router-link
              to="/signup"
              tag="span"
              class="app__router mr-2 caption hidden-xs-only"
              >Don't Have An Account? Sign Up</router-link
            >
          </v-card-actions>
          <v-layout v-if="breakPoint.xsOnly">
            <router-link to="/signup" tag="span" class="caption ml-4 mb-3"
              >Don't Have An Account? Sign Up</router-link
            >
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      usernameRules: [
        (username) => !!username || 'Username is required',
        (username) =>
          (username.length >= 4 && username.length <= 20) ||
          'Username cannot be less than 4 characters',
      ],
      passwordRules: [
        (password) => !!password || 'Password is required',
        (password) =>
          password.length >= 6 || 'Password must be at least 6 characters',
      ],
      isFormValid: true,
      signedIn: false,
    };
  },
  computed: {
    ...mapGetters(['colors', 'loading', 'user', 'formError', 'darkTheme']),
    breakPoint() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    user() {
      this.$router.push({ name: 'Home' });
    },
  },
  methods: {
    ...mapActions(['signinUser', 'getCurrentUser']),
    onSignUserIn() {
      if (this.$refs.form.validate()) {
        const credentials = {
          username: this.username,
          password: this.password,
        };

        this.signinUser(credentials)
          .then((res) => {
            if (res) {
              this.$toast.success('Signed In');
              this.getCurrentUser();
              this.$router.push({ name: 'Profile' });
            }
          })
          .catch(({ message }) => {
            this.$toast.error(message.slice(15));
          });
      }
    },
    onToggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
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