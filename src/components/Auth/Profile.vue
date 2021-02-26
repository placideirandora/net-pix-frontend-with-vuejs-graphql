<template>
  <v-container>
    <h1>{{ user.username.toUpperCase() }}'S PROFILE</h1>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
