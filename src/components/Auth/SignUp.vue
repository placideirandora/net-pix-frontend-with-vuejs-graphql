<template>
  <v-container class="app text-center text-uppercase">
    <v-row>
      <v-col>
        <img
          src="../../assets/get-started.svg"
          alt="authentication"
          :width="breakPoint.smAndDown ? 250 : 500"
          height="200"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="app__title">Get Started</h1>
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
                :rules="emailRules"
                label="Email"
                prepend-icon="mdi-email"
                :clearable="breakPoint.xsOnly ? false : true"
                v-model="email"
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
                @click:append="showPassword = !showPassword"
                v-model="password"
              />
              <v-text-field
                :color="colors.secondary"
                :rules="passwordConfRules"
                label="Confirm Password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-gavel"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :clearable="breakPoint.xsOnly ? false : true"
                @click:append="onToggleShowPassword"
                v-model="passwordConfirmation"
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
              @click="onSignUserUp"
            >
              Sign Up
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
                to="/signin"
                tag="span"
                class="app__router mr-2 hidden-xs-only"
                >Already Have An Account? Sign In</router-link
              >
            </v-container>
          </v-card-actions>
          <v-layout v-if="breakPoint.xsOnly">
            <router-link to="/signin" tag="span" class="caption ml-4 mb-3"
              >Already Have An Account? Sign In</router-link
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
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      usernameRules: [
        (username) => !!username || 'Username is required',
        (username) =>
          (username.length >= 4 && username.length <= 20) ||
          'Username cannot be less than 4 or greater than 20 characters',
      ],
      emailRules: [
        (email) => !!email || 'Email is required',
        (email) =>
          /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email) ||
          'Email must be valid',
      ],
      passwordRules: [
        (password) => !!password || 'Password is required',
        (password) =>
          password.length >= 6 || 'Password must be at least 6 characters',
      ],
      passwordConfRules: [
        (passwordConf) => !!passwordConf || 'Password Confirmation is required',
        (passwordConf) =>
          passwordConf.length >= 6 || 'Password must be at least 6 characters',
        (passwordConf) =>
          passwordConf === this.password || 'Passwords must match',
      ],
      isFormValid: true,
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
    ...mapActions(['signupUser', 'getCurrentUser']),
    onSignUserUp() {
      if (this.$refs.form.validate()) {
        const credentials = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        this.signupUser(credentials)
          .then((res) => {
            if (res) {
              this.$toast.success('Signed Up');
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
