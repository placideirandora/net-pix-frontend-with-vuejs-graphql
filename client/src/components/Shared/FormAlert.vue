<template>
  <v-alert
    :type="type"
    :color="color"
    :value="true"
    dense
    text
    outlined
    transition="scale-transition"
    dismissible
  >{{ message }}</v-alert>
</template>

<script>
export default {
  name: 'FormAlert',
  props: ['message', 'type', 'color']
};
</script>