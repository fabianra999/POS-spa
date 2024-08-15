<template>
  <HeaderPagesCom
    :title="$t('invoicesTitle')"
    :subTitle="$t('invoiceSubTitle')"
  />
  <TableBilling />
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
