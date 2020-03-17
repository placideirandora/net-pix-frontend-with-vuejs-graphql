<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="10" class="mx-auto">
        <v-snackbar top center :color="messageType" :timeout="duration" v-model="display">
          <v-icon class="mr-3" color="white">{{ icon }}</v-icon>
          <h4>{{ message }}</h4>
          <v-btn @click="closeMessage">Close</v-btn>
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
    }
  },
  methods: {
    closeMessage() {
      this.display = false
    }
  },
};
</script>