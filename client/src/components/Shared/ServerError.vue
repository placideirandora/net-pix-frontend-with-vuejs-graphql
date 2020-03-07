<template>
  <v-container>
    <img src="../../assets/not-found.svg" width="440" height="300" alt />
    <h2 class="text-uppercase">Something bad has just happened</h2>
    <h3>{{ message }}</h3>
  </v-container>
</template>

<script>
export default {
  name: 'ServerError',
  props: ['message']
};
</script>