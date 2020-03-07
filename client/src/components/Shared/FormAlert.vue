<template>
  <v-alert :type="type" :color="color" :value="true" transition="scale-transition" outlined text dismissible>
    <h4>{{ message }}</h4>
  </v-alert>
</template>

<script>
export default {
  name: 'FormAlert',
  props: ['message', 'type', 'color']
};
</script>