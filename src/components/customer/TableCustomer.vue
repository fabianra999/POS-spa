<template>
  <v-data-table-server
    :items-length="totalItems"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'documentId', order: 'asc' }]"
    v-model:expanded="expanded"
    item-value="name"
    show-expand
    @update:options="initialize"
  >
    <template v-slot:item.state="{ item }">
      {{ item.state === true ? "Activo" : "Inactivo" }}
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ $t("customer") }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="80vw">
          <template v-slot:activator="{ props }">
            <v-btn
              prepend-icon="$vuetify"
              v-bind="props"
              :color="st_button.color"
              :variant="st_button.variant"
            >
              {{ $t("newCustomer") }}
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
                        :variant="st_input.variant"
                        @blur="v$.editedItem.name.$touch"
                        @input="v$.editedItem.name.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        :label="$t('lastName')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.lastName.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.lastName.$touch"
                        @input="v$.editedItem.lastName.$touch"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        :label="$t('email')"
                        :error-messages="
                          getErrorMessage(v$.editedItem.email.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.email.$touch"
                        @input="v$.editedItem.email.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.documentIdType"
                        :label="$t('documentIdType')"
                        :items="listdocumentIdType"
                        item-title="name"
                        item-value="id"
                        :error-messages="
                          getErrorMessage(
                            v$.editedItem.documentIdType.$errors
                          )
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.documentIdType.$touch"
                        @input="v$.editedItem.documentIdType.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="editedItem.documentId"
                        :label="$t('documentIdType')"
                        :error-messages="
                          getErrorMessage(v$.editedItem.documentId.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.documentId.$touch"
                        @input="v$.editedItem.documentId.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-date-input
                        v-model="editedItem.dateBirth"
                        :label="$t('dateBirth')"
                        hide-details="true"
                        :error-messages="
                          getErrorMessage(v$.editedItem.dateBirth.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.dateBirth.$touch"
                        @input="v$.editedItem.dateBirth.$touch"
                      ></v-date-input>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.country"
                        :label="$t('country')"
                        :items="listCountry"
                        item-title="name"
                        item-value="id"
                        :error-messages="
                          getErrorMessage(v$.editedItem.country.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.country.$touch"
                        @input="v$.editedItem.country.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.city"
                        :label="$t('city')"
                        :items="listCity"
                        item-title="name"
                        item-value="id"
                        :error-messages="
                          getErrorMessage(v$.editedItem.city.$errors)
                        "
                        :variant="st_input.variant"
                        @blur="v$.editedItem.city.$touch"
                        @input="v$.editedItem.city.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox
                        v-model="editedItem.state"
                        :label="$t('state')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItem.state.$errors)
                        "
                        :variant="st_input.variant"
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
                :variant="st_button.variant"
                :color="st_button.color"
                :size="st_button.size"
                @click="close"
              >
                {{ $t("btn-cancel") }}
              </v-btn>

              <v-btn
                :variant="st_button.variant"
                :color="st_button.color"
                :size="st_button.size"
                @click="save"
              >
                {{ $t("btn-save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="auto" scrollable>
          <v-card prepend-icon="mdi-earth" :title="$t('deleteCustomer')">
            <v-card-title
              class="text-h6 pa-7 justify-space-between align-center"
            >
              {{ $t("alert-Delete") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions class="">
              <v-spacer></v-spacer>
              <v-btn
                :variant="st_button.variant"
                :color="st_button.color"
                :size="st_button.size"
                @click="closeDelete"
              >
                {{ $t("btn-cancel") }}
              </v-btn>
              <v-btn
                :variant="st_button.variant"
                :color="st_button.color"
                :size="st_button.size"
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
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

import { useCustomerStore } from "@/stores/customer";
import { useCommonStore } from "@/stores/common";

import { storeToRefs } from "pinia";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();

const customerStore = useCustomerStore();
const commonStore = useCommonStore();

export default {
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });

    const listdocumentIdType = commonStore.documentIdType;
    const listRole = commonStore.role;
    const listCountry = commonStore.country;
    const listCity = commonStore.city;

    const { st_button, st_input } = storeToRefs(themeStore);

    return {
      v$: useVuelidate(),
      t,
      listdocumentIdType,
      listRole,
      listCountry,
      listCity,
      st_button,
      st_input,
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
      { title: "Apellido", key: "lastName" },
      { title: "Documento", key: "documentId" },
      { title: "E-mail", key: "email" },
      { title: "Estado", key: "state" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      name: "",
      lastName: "",
      documentIdType: null,
      documentId: "",
      email: "",
      dateBirth: new Date(),
      country: "",
      city: "",
      state: true,
    },
    editedItem: {
      name: "",
      lastName: "",
      documentIdType: null,
      documentId: "",
      email: "",
      dateBirth: new Date(),
      country: "",
      city: "",
      state: true,
    },
  }),

  validations() {
    return {
      editedItem: {
        name: { required },
        lastName: { required },
        email: {},
        documentIdType: {},
        documentId: {},
        dateBirth: {},
        country: {},
        city: {},
        state: { required },
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? this.t("newCustomer") : this.t("editCustomer");
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
  },

  methods: {
    initialize({ page, itemsPerPage, sortBy }) {
      customerStore.GET_CUSTOMERS({ page: page, perPage: itemsPerPage }).then(() => {
        this.desserts = customerStore.customers.data;
        this.totalItems = customerStore.customers.items;
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.findIndex(
        (user) => user.id === { ...item }.id
      );
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      customerStore.DELETE_CUSTOMER(this.editedItem.id).then(() => {
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
        customerStore
          .PUT_CUSTOMER({
            id: this.editedItem.id,
            data: this.editedItem,
          })
          .then(() => {
            this.initialize({ page: 1, itemsPerPage: 10 });
          });
      } else {
        customerStore.POST_CUSTOMER(this.editedItem).then(() => {
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
