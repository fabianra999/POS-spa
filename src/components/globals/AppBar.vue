<!-- filename: HeaderCom.vue -->
<template>
  <v-app-bar color="primary" prominent>
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
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            subtitle="Founder of Vuetify"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
          <v-btn color="primary" variant="text" @click="menu = false">
            Save
          </v-btn>
        </v-card-actions>
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

<script>
import { reactive, ref, onMounted } from "vue";
import { useCommonStore } from "@/stores/common";
const commonStore = useCommonStore();


export default {
  setup() {
    const items = ref([]);
    const drawer = ref(false);
    const group = ref(null);

    const fav = ref(true);
    const menu = ref(false);
    const message = ref(false);
    const hints = ref(true);

    watch(
      () => commonStore.pages_gt,
      (newValue, oldValue) => {
        items.value = [...commonStore.pages_gt];
      }
    );

    watch(group, (newValue, oldValue) => {
      drawer.value = false;
    });
    onMounted(() => {});
    return {
      items,
      drawer,
      group,

      fav,
      menu,
      message,
      hints,
    };
  },
};
</script>

<style lang="scss" scoped></style>
