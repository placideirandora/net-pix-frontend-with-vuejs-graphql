<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="10" class="mx-auto">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FormAlert',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
};
</script>