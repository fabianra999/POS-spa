<template>
  <v-app>
    <v-layout>
      <AppBar />
      <HeaderCom />
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
import { usethemeStore } from "@/stores/theme";

const commonStore = useCommonStore();
const themeStore = usethemeStore();

const promises = [
  commonStore.GET_Dictionarys({ name: "country" }),
  commonStore.GET_Dictionarys({ name: "city" }),
  commonStore.GET_Dictionarys({ name: "state" }),
  commonStore.GET_Dictionarys({ name: "documentIdType" }),
  commonStore.GET_Dictionarys({ name: "role" }),
  commonStore.GET_Dictionarys({ name: "paymentMethods" }),
  commonStore.GET_Dictionarys({ name: "inventaryType" }),
  commonStore.GET_Dictionarys({ name: "categories" }),
  commonStore.GET_Dictionarys({ name: "services" }),
  commonStore.GET_Dictionarys({ name: "theme" }),
  commonStore.GET_Dictionarys({ name: "login" }),
  commonStore.GET_Dictionarys({ name: "pages" }),
  commonStore.GET_USERS({ page: 1, perPage: 100 }),
  themeStore.GET_THEM(),
];

Promise.all(promises).then(() => {
  commonStore
    .GET_Dictionarys({ name: "users", id: commonStore.login.user })
    .then((response) => {
      // commonStore.setLoading(false);
      commonStore.GET_Dictionarys({ name: "permissions", id: response.role });
    });
});
onMounted(() => {});
</script>

<style lang="scss" scoped>
</style>
