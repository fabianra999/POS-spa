<!-- filename: HeaderCom.vue -->
<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        :prepend-avatar="user.img"
        :title="user.name"
        :subtitle="user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="Tablero"
        value="myfiles"
      ></v-list-item>
      <v-list-item
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
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

const nameLogin = ref("");

const user = reactive({
  name: "",
  email: "",
  img: "",
});

onMounted(() => {
  user.name = commonStore.users.name + " " + commonStore.users.lastName;
  user.email = commonStore.users.email;
  user.img = commonStore.users.img;
});
</script>

<style lang="scss" scoped>
</style>