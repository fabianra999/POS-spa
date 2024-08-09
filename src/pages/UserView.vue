<!-- filename: UserView.vue -->
<template>
  <HeaderPagesCom :title="$t('userTitle')" :subTitle="$t('userSubTitle')" />

  <TableUser />

</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";

onMounted(() => {});

</script>

<style lang="scss" scoped>
</style>