<template>
  <HeaderPagesCom
    :title="$t('servicesTitle')"
    :subTitle="$t('inventorySubTitle')"
  />
  <TableServices />
</template>
  
  <script setup>
import { reactive, onMounted, ref, computed } from "vue";

onMounted(() => {});
</script>
  
  <style lang="scss" scoped>
</style>