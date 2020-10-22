<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="10" class="mx-auto">
        <v-snackbar bottom center :color="messageType" :timeout="duration" v-model="display">
          <v-icon class="mr-3" color="white">{{ icon }}</v-icon>
          <h4 v-if="!breakPoint.xsOnly">{{ message }}</h4>
          <h5 v-if="breakPoint.xsOnly">{{ message }}</h5>
          <v-btn @click="closeMessage" :small="breakPoint.xsOnly ? true : false">Close</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    message: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    },
    icon: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      display: true
    };
  },
  methods: {
    closeMessage() {
      this.display = false;
    }
  },
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  }
};
</script>