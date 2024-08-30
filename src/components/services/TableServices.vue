<template>
  <v-data-table-server
    :items-length="totalItems"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="dessertsUsers"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    v-model:expanded="expanded"
    item-value="name"
    show-expand
    @update:options="initialize"
  >
    <template v-slot:item.category="{ item }">
      {{ $filters.findByKey(listCategories, "id", item.category) }}
    </template>
    <template v-slot:item.state="{ item }">
      {{ item.state === true ? "Activo" : "Inactivo" }}
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ $t("inventary") }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="80vw">
          <template v-slot:activator="{ props }">
            <v-btn
              prepend-icon="$vuetify"
              v-bind="props"
              :variant="buttonField.variant"
        :size="buttonField.size"
        :rounded="buttonField.rounded"
        :color="buttonField.color"
            >
              {{ $t("inventaryNew") }}
            </v-btn>
          </template>
          <v-card class="formUser">
            <v-card-title>
              <span class="text-h3">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.trim="editedItem.name"
                        :label="$t('name')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.name.$errors)
                        "
                       :variant="textField.variant"
                        :color="textField.color"
                        :bg-color="textField.bgColor"
                        :base-color="textField.baseColor"
                        :clearable="textField.clearable"
                        @blur="v$.editedItem.name.$touch"
                        @input="v$.editedItem.name.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.category"
                        :label="$t('category')"
                        :items="listCategories"
                        item-title="name"
                        item-value="id"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.category.$errors)
                        "
                        :clearable="autocomplete.clearable"
                        :variant="autocomplete.variant"
                        :chips="autocomplete.chips"
                        :base-color="autocomplete.baseColor"
                        :bg-color="autocomplete.bgColor"
                        :color="autocomplete.color"
                        @blur="v$.editedItem.category.$touch"
                        @input="v$.editedItem.category.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.duration"
                        :label="$t('duration')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.duration.$errors)
                        "
                        :variant="textField.variant"
                        :color="textField.color"
                        :bg-color="textField.bgColor"
                        :base-color="textField.baseColor"
                        :clearable="textField.clearable"
                        @blur="v$.editedItem.duration.$touch"
                        @input="v$.editedItem.duration.$touch"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        :label="$t('price')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.price.$errors)
                        "
                        :variant="textField.variant"
                        :color="textField.color"
                        :bg-color="textField.bgColor"
                        :base-color="textField.baseColor"
                        :clearable="textField.clearable"
                        @blur="v$.editedItem.price.$touch"
                        @input="v$.editedItem.price.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox
                        v-model="editedItem.state"
                        :label="$t('state')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.state.$errors)
                        "
                        @blur="v$.editedItem.state.$touch"
                        @input="v$.editedItem.state.$touch"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
              :variant="buttonField.variant"
        :size="buttonField.size"
        :rounded="buttonField.rounded"
        :color="buttonField.color"
                @click="close"
              >
                {{ $t("btn-cancel") }}
              </v-btn>

              <v-btn
              :variant="buttonField.variant"
        :size="buttonField.size"
        :rounded="buttonField.rounded"
        :color="buttonField.color"
                @click="save"
              >
                {{ $t("btn-save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="auto" scrollable>
          <v-card prepend-icon="mdi-earth" :title="$t('deleteInventary')">
            <v-card-title
              class="text-h6 pa-7 justify-space-between align-center"
            >
              {{ $t("alert-Delete-inventary") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="">
              <v-spacer></v-spacer>
              <v-btn
              :variant="buttonField.variant"
        :size="buttonField.size"
        :rounded="buttonField.rounded"
        :color="buttonField.color"
                @click="closeDelete"
              >
                {{ $t("btn-cancel") }}
              </v-btn>
              <v-btn
              :variant="buttonField.variant"
        :size="buttonField.size"
        :rounded="buttonField.rounded"
        :color="buttonField.color"
                @click="deleteItemConfirm"
              >
                {{ $t("btn-save") }}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> {{ $t("btn-Reset") }} </v-btn>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <h2 class="mt-6">
            {{ $t("infoUser") }} - {{ item.name }} {{ item.lastName }}
          </h2>
          <v-container :fluid="true">
            <v-row>
              <v-col v-for="(date, key) in item" :key="key" cols="12" md="3">
                <v-card
                  class="mx-auto my-2"
                  elevation="5"
                  variant="plain"
                  color="tonal"
                >
                  <v-card-item>
                    <v-card-title> {{ $t(key) }} </v-card-title>
                    <v-card-subtitle>
                      {{ date }}
                    </v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script>
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

import { useCommonStore } from "@/stores/common";
import { useServicesSoldStore } from "@/stores/services";
import { useTheme } from "vuetify";


const servicesSoldStore = useServicesSoldStore();
const commonStore = useCommonStore();

export default {
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });

    const listCategories = commonStore.categories;

    const theme = useTheme();
    return {
      v$: useVuelidate(),
      t,
      listCategories,
      theme,
    };
  },
  data: () => ({
    itemsPerPage: 10,
    loading: true,
    totalItems: 0,
    expanded: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Nombre",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Id", key: "id" },
      { title: "Categoria", key: "category" },
      { title: "Precio", key: "price" },
      { title: "Duracion", key: "duration" },
      { title: "Estado", key: "state" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    dessertsUsers: [],
    editedIndex: -1,
    defaultItem: {
      category: null,
      duration: null,
      name: "",
      price: null,
      state: false,
    },
    editedItem: {
      category: null,
      duration: null,
      name: "",
      price: null,
      state: false,
    },
    autocomplete: {},
    textField: {},
    buttonField: {},
  }),

  validations() {
    return {
      editedItem: {
        name: { required },
        category: { required },
        duration: { required },
        price: { required },
        state: { required },
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.t("newInventary")
        : this.t("editInventary");
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    // this.initialize();
    this.autocomplete = this.theme.global.current.value.variables.autocomple;
    this.textField = this.theme.global.current.value.variables.textField;
    this.buttonField = this.theme.global.current.value.variables.buttonField;
  },

  methods: {
    initialize({ page, itemsPerPage, sortBy }) {
      servicesSoldStore
        .GET_SERVICES({ page: page, perPage: itemsPerPage })
        .then(() => {
          this.dessertsUsers = servicesSoldStore.services.data;
          this.totalItems = servicesSoldStore.services.items;
        });
    },

    editItem(item) {
      this.editedIndex = this.dessertsUsers.findIndex(
        (user) => user.id === { ...item }.id
      );
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dessertsUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      servicesSoldStore.DELETE_SERVICE(this.editedItem.id).then(() => {
        this.initialize({ page: 1, itemsPerPage: 10 });
      });
      this.closeDelete();
    },

    close() {
      this.v$.$reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      if (this.editedIndex > -1) {
        servicesSoldStore
          .PUT_SERVICE({
            id: this.editedItem.id,
            data: this.editedItem,
          })
          .then(() => {
            this.initialize({ page: 1, itemsPerPage: 10 });
          });
      } else {
        servicesSoldStore.POST_SERVICE(this.editedItem).then(() => {
          this.initialize({ page: 1, itemsPerPage: 10 });
        });
      }
      this.close();
    },

    getErrorMessage(errors) {
      if (errors.length > 0) {
        const error = errors[0];
        return this.t(`validation.${error.$validator}`, error.$params);
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.formUser {
  .v-card-title {
    display: flex;
    justify-content: flex-start;
    margin: 0em 1em;
    padding: 2em 1em;
    border-bottom: 1px solid grey;
    span {
      font-weight: 200;
    }
  }
  .v-card-actions {
    justify-content: flex-end;
    margin: 0em 1em;
    padding: 2em 1em;
    border-top: 1px solid grey;
  }
}
.v-data-table {
  .v-toolbar {
    .v-btn {
      margin: 0em 1em;
    }
  }
}
.v-overlay__content {
  .v-card-item {
    background-color: gainsboro;
  }
}
</style>
