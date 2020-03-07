<template>
  <ListLoader primaryColor="#CECECE" :width="250" :height="200" :speed="1" />
</template>

<script>
import { ListLoader } from 'vue-content-loader';

export default {
  name: 'ContentLoader',
  components: {
    ListLoader
  }
};
</script>