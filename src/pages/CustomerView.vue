<template>
    <HeaderPagesCom :title="$t('customerTitle')" :subTitle="$t('customerSubTitle')" />
    <TableCustomer />
  </template>
  
  <script setup>
  import { reactive, onMounted, ref, computed } from "vue";
  
  onMounted(() => {});
  </script>
  
  <style lang="scss" scoped>
  </style>