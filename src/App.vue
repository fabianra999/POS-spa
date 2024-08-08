<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

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
