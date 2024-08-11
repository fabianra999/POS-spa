<!-- filename: HeaderCom.vue -->
<template>
  <v-container :fluid="true" class="mt-5 mb-5">
    <v-row class="headerPage__header">
      <v-col>
        <h1 :style="st_headerPages_h1">
          {{ title }}
        </h1>
        <p>
          {{ subTitle }}
        </p>
      </v-col>
      <v-col class="text-center">
        <v-icon class="iconoHeader" icon="md:history" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();

const { st_headerPages_h1 } = storeToRefs(themeStore);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.headerPage__header {
  margin: 3em;
  h1 {
    margin-bottom: 0.8em;
    color: #484848;
    font-size: 4em;
    font-weight: 300;
    line-height: 1.2;
    white-space: pre-wrap;
  }
  p {
    color: #484848;
    font-weight: 100;
    font-size: 1.2em;
  }
  .iconoHeader {
    font-size: 20em;
    text-align: center;
    color: rgb(161, 159, 157);
  }
}
</style>