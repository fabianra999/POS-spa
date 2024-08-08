<!-- filename: HeaderCom.vue -->
<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      v-if="adminOptions"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>My files</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
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

<script>
import { reactive, ref, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();

export default {
  setup() {
    const items = ref("");
    const drawer = ref(false);
    const group = ref(null);
    const adminOptions = ref(false);

    watch(group, (newValue, oldValue) => {
      drawer.value = false;
    });
    onMounted(() => {
      adminOptions.value = commonStore.permissions.name === "admin" ? true : false;
      items.value = [...commonStore.permissions.routes];
    });
    return {
      items,
      drawer,
      group,
      adminOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>