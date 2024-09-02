<template>
  <HeaderPagesCom
    :title="$t('servicesTitle')"
    :subTitle="$t('inventorySubTitle')"
    icon="md:design_services"
  />
  <TableServices />
  <route lang="yaml"> meta: layout: default requiresAuth: true </route>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
