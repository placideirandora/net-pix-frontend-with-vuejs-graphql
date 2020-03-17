<template>
  <v-container>
    <v-row>
      <v-col xs="8" sm="10" md="10" lg="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-layout justify-center>
          <img
            src="../../assets/no-data.svg"
            :width="breakPoint.smAndDown ? 200 : 500"
            height="300"
          />
        </v-layout>
      </v-col>
    </v-row>

    <v-row>
      <v-col xs="8" sm="10" md="10" lg="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-layout justify-center>
          <h2 v-if="!breakPoint.smAndDown" class="text-uppercase">Data Not Found</h2>
          <h4 v-if="breakPoint.smAndDown" class="text-uppercase">Data Not Found</h4>
        </v-layout>
      </v-col>
    </v-row>

    <v-row>
      <v-col xs="8" sm="10" md="10" lg="12" :class="breakPoint.smAndDown ? 'mx-auto' : null">
        <v-layout justify-center>
          <h3 v-if="!breakPoint.smAndDown">{{ message }}</h3>
          <h5 v-if="breakPoint.smAndDown">{{ message }}</h5>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DataNotFound',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint;
    }
  }
};
</script>