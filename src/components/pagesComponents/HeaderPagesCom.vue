<!-- filename: HeaderCom.vue -->
<template>
  <v-container :fluid="true" class="mt-5 mb-5">
    <v-row class="headerPage__header">
      <v-col>
        <!-- <h1 :style="st_headerPages_h1">
          {{ title }}
        </h1> -->
         <h1>
          {{ title }}
        </h1>
        <p>
          {{ subTitle }}
        </p>
      </v-col>
      <v-col class="text-center">
        <v-icon class="iconoHeader" :icon="icon" />
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
  icon: {
    type: String,
    default: 'md:history',
  },
});
</script>

<style lang="scss" scoped>
.headerPage__header {
  margin: 3em;
  h1 {
    margin-bottom: 0.8em;
    color: rgba(var(--v-theme-title), 1);
    font-size: 4em;
    font-weight: var(--v-titleFontWeight);
    line-height: 1.2;
    white-space: pre-wrap;
  }
  p {
    color: rgba(var(--v-theme-text), 1);
    font-weight: 100;
    font-size: var(--v-textSize);
  }
  .iconoHeader {
    font-size: var(--v-iconHeaderSize);
    text-align: center;
    color: rgba(var(--v-theme-iconHeader), 1);
  }
}
</style>