<template>
  <v-app>
    <v-layout>
      <AppBar />
      <v-main>
        <router-view />
      </v-main>
      <AppFooter />
    </v-layout>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

commonStore.GET_Dictionarys({ name: "theme" });
commonStore.GET_Dictionarys({ name: "pages" });

const promises = [
  // commonStore.GET_Dictionarys({ name: "theme" }),
  // commonStore.GET_Dictionarys({ name: "pages" }),
];

Promise.all(promises).then(() => {
  // commonStore
  //   .GET_Dictionarys({ name: "users", id: commonStore.login.user })
  //   .then((response) => {
  //     // commonStore.setLoading(false);
  //     commonStore.GET_Dictionarys({ name: "permissions", id: response.role });
  //   });
});
onMounted(() => {});
</script>

<style lang="scss" scoped></style>
