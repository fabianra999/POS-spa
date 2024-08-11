<template>
    <HeaderPagesCom :title="$t('inventoryTitle')" :subTitle="$t('inventorySubTitle')" />
    <TableInventory />
  </template>
  
  <script setup>
  import { reactive, onMounted, ref, computed } from "vue";
  
  onMounted(() => {});
  </script>
  
  <style lang="scss" scoped>
  </style>