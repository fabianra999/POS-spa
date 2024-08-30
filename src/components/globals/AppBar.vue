<!-- filename: HeaderCom.vue -->
<template>
  <v-app-bar color="navBar" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>My files</v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp"> </template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text"></v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="md:contrast"></v-icon>
            </template>
            <!-- <v-list-item-title>Hola</v-list-item-title> -->
            <v-switch
              v-model="themeColor"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-btn @click="logaout">
              <v-icon icon="md:logout"></v-icon>  logout</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        :to="item.url"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";
import { useTheme } from "vuetify";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();
const commonStore = useCommonStore();
const theme = useTheme();

const items = ref([]);
const drawer = ref(false);
const group = ref(null);

const fav = ref(true);
const menu = ref(false);
const hints = ref(true);
const themeColor = ref(false);
const message = ref(false);

watch(
  () => commonStore.pages_gt,
  (newValue, oldValue) => {
    items.value = [...commonStore.pages_gt];
  }
);

watch(group, (newValue, oldValue) => {
  drawer.value = false;
});
watch(themeColor, (newValue, oldValue) => {
  if (newValue) {
    theme.global.name.value = "dark";
  } else {
    theme.global.name.value = themeStore.theme.themeName;
  }
});

const logaout = () => {
  localStorage.removeItem('authToken');
  location.reload();
};
</script>

<style lang="scss" scoped></style>
