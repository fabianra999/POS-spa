<template>
  <HeaderPagesCom
    :title="$t('invoicesTitle')"
    :subTitle="$t('invoiceSubTitle')"
  />
  <TableBilling />
</template>
    
    <script setup>
import { reactive, onMounted, ref, computed } from "vue";

onMounted(() => {});
</script>
    
    <style lang="scss" scoped>
</style>