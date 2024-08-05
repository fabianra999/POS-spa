<!-- filename: HeaderCom.vue -->
<template>
 <v-container>
  <v-row>
    <v-col>
      <h1>{{ title }}</h1>
      <p>{{ subTitle }}</p>
    </v-col>
  </v-row>
 </v-container>
</template>

<script setup>
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
</style>