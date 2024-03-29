<template>
  <v-container class="app text-center text-uppercase">
    <v-row>
      <v-col>
        <img src="../../assets/post.svg" alt="authentication" width="300" height="200" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="app__title">Publish A Post</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="11" md="12" lg="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-card
          width="750"
          class="mx-auto"
          :color="!darkTheme ? colors.backgroundLight : colors.backgroundDark"
        >
          <v-card-text>
            <v-form v-model="isFormValid" lazy-validation ref="form">
              <v-text-field
                :color="colors.secondary"
                :rules="titleRules"
                label="Title"
                prepend-icon="mdi-format-title"
                :clearable="true"
                v-model="title"
                autocomplete="off"
              />
              <v-text-field
                :color="colors.secondary"
                :rules="imgUrlRules"
                label="Image URL"
                prepend-icon="mdi-link"
                :clearable="true"
                v-model="imgUrl"
                autocomplete="off"
              />
              <v-img
                v-if="imgUrl"
                :src="imgUrl"
                alt="Image Preview"
                :max-height="300"
                :max-width="700"
                class="ml-8"
              />
              <v-select
                :color="colors.secondary"
                :rules="categoryRules"
                label="Categories"
                :items="options"
                multiple
                prepend-icon="mdi-animation"
                :clearable="true"
                v-model="categories"
                :class="imgUrl ? 'mt-7' : null"
                autocomplete="off"
              ></v-select>
              <v-textarea
                :color="colors.secondary"
                :rules="descriptionRules"
                outlined
                auto-grow
                label="Description"
                prepend-icon="mdi-message-processing-outline"
                :clearable="true"
                v-model="description"
                :class="!isFormValid ? 'mt-6' : 'mt-7'"
                autocomplete="off"
              />
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              dark
              class="ma-2"
              :color="colors.secondary"
              :disabled="!isFormValid"
              :loading="loading"
              @click="handlePublishPost"
            >
              Publish
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </template>
              <v-icon dark right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AddPost',
  data() {
    return {
      title: '',
      description: '',
      imgUrl: '',
      options: [
        'Art',
        'Education',
        'Music',
        'Nature',
        'Travel',
        'Food',
        'Health',
        'Other'
      ],
      categories: [],
      titleRules: [
        title => !!title || 'Title is required',
        title =>
          (title.length >= 10 && title.length <= 50) ||
          'Title cannot be less than 10 or greater than 50 characters'
      ],
      descriptionRules: [
        description => !!description || 'Description is required',
        description =>
          description.length >= 100 ||
          'Description cannot be less than 100 characters',
        description =>
          description.length <= 5000 ||
          'Description cannot be  greater than 5000 characters'
      ],
      imgUrlRules: [imgUrl => !!imgUrl || 'Image URL is required'],
      categoryRules: [
        categories =>
          !!categories.length >= 1 || 'At least one category is required'
      ],
      isFormValid: true
    };
  },
  computed: {
    ...mapGetters(['user', 'colors', 'loading', 'formError', 'darkTheme']),
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  },
  methods: {
    handlePublishPost() {
      if (this.$refs.form.validate()) {
        const post = {
          title: this.title,
          imageUrl: this.imgUrl,
          categories: this.categories,
          description: this.description,
          author: this.user._id
        };
        this.$store.dispatch('publishPost', post);
        this.$router.push({ name: 'Home' });
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

