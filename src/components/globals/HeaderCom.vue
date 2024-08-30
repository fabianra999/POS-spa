<!-- filename: HeaderCom.vue -->
<template>
  <v-navigation-drawer color="sidebar" expand-on-hover rail>
    <v-list>
      <v-list-item
        :prepend-avatar="commonStore.users.img"
        :title="commonStore.users.name + ' ' + commonStore.users.lastName"
        :subtitle="commonStore.users.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in commonStore.permissions.routes"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.name"
        :value="item.url"
        :to="item.url"
        color="primary"
      ></v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-folder"
        title="Datos personales"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-folder"
        title="Agenda"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Informes"
        value="shared"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Descansos"
        value="starred"
      ></v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
