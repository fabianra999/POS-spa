<template>
  <HeaderPagesCom :title="$t('userTitle')" :subTitle="$t('userSubTitle')" />
  <TableUser />
</template>
<route lang="yaml">
meta:
  layout: default
  requiresAuth: true
</route>
<script setup>
import { reactive, onMounted, ref, computed } from "vue";

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
