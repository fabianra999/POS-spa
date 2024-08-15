<template>
    <HeaderPagesCom :title="$t('inventoryTitle')" :subTitle="$t('inventorySubTitle')" />
    <TableInventory />
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
  
  <style lang="scss" scoped>
  </style>