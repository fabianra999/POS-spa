<template>
  <v-data-table-server
    :items-length="totalItems"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="dessertsUsers"
    :sort-by="[{ key: 'documentId', order: 'asc' }]"
    v-model:expanded="expanded"
    item-value="name"
    show-expand
    @update:options="initialize"
  >
    <template v-slot:item.role="{ item }">
      {{ $filters.findByKey(listRole, "id", item.role) }}
    </template>
    <template v-slot:item.state="{ item }">
      {{ item.state === true ? "Activo" : "Inactivo" }}
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ $t("users") }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="80vw">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              {{ $t("newUser") }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.trim="editedItemUser.name"
                        :label="$t('name')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.name.$errors)
                        "
                        @blur="v$.editedItemUser.name.$touch"
                        @input="v$.editedItemUser.name.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItemUser.lastName"
                        :label="$t('lastName')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.lastName.$errors)
                        "
                        @blur="v$.editedItemUser.lastName.$touch"
                        @input="v$.editedItemUser.lastName.$touch"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItemUser.email"
                        :label="$t('email')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.email.$errors)
                        "
                        @blur="v$.editedItemUser.email.$touch"
                        @input="v$.editedItemUser.email.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItemUser.documentIdType"
                        :label="$t('documentIdType')"
                        :items="listdocumentIdType"
                        item-title="name"
                        item-value="id"
                        required
                        :error-messages="
                          getErrorMessage(
                            v$.editedItemUser.documentIdType.$errors
                          )
                        "
                        @blur="v$.editedItemUser.documentIdType.$touch"
                        @input="v$.editedItemUser.documentIdType.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="editedItemUser.documentId"
                        :label="$t('documentIdType')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.documentId.$errors)
                        "
                        @blur="v$.editedItemUser.documentId.$touch"
                        @input="v$.editedItemUser.documentId.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-date-input
                        v-model="editedItemUser.dateBirth"
                        :label="$t('dateBirth')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.dateBirth.$errors)
                        "
                        @blur="v$.editedItemUser.dateBirth.$touch"
                        @input="v$.editedItemUser.dateBirth.$touch"
                      ></v-date-input>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItemUser.role"
                        :label="$t('role')"
                        :items="listRole"
                        item-title="name"
                        item-value="id"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.role.$errors)
                        "
                        @blur="v$.editedItemUser.role.$touch"
                        @input="v$.editedItemUser.role.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItemUser.password"
                        :label="$t('password')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.password.$errors)
                        "
                        @blur="v$.editedItemUser.password.$touch"
                        @input="v$.editedItemUser.password.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItemUser.country"
                        :label="$t('country')"
                        :items="listCountry"
                        item-title="name"
                        item-value="id"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.country.$errors)
                        "
                        @blur="v$.editedItemUser.country.$touch"
                        @input="v$.editedItemUser.country.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItemUser.city"
                        :label="$t('city')"
                        :items="listCity"
                        item-title="name"
                        item-value="id"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.city.$errors)
                        "
                        @blur="v$.editedItemUser.city.$touch"
                        @input="v$.editedItemUser.city.$touch"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox
                        v-model="editedItemUser.state"
                        :label="$t('state')"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.state.$errors)
                        "
                        @blur="v$.editedItemUser.state.$touch"
                        @input="v$.editedItemUser.state.$touch"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                {{ $t("btn-cancel") }}
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                {{ $t("btn-save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              {{ $t("alert-Delete") }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                {{ $t("btn-cancel") }}
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
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
         {{ $t("infoUser") }} - {{ item.name }} {{ item.lastName }}
          <v-container fluid="true">
            <v-row>
              <v-col v-for="(date, key) in item" :key="key" cols="12" md="3">
                <v-card class="mx-auto my-2" elevation="5">
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

import { useUserStore } from "@/stores/user";
import { useCommonStore } from "@/stores/common";

import { findByKey } from "@/utils/utils"; // Importa las funciones de utils.js

const userStore = useUserStore();
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

    return {
      v$: useVuelidate(),
      t,
      listdocumentIdType,
      listRole,
      listCountry,
      listCity,
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
      { title: "Documento", key: "documentId" },
      { title: "E-mail", key: "email" },
      { title: "Rol", key: "role" },
      { title: "Estado", key: "state" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    dessertsUsers: [],
    editedIndex: -1,
    defaultItemUser: {
      name: "",
      lastName: "",
      documentIdType: null,
      documentId: "",
      email: "",
      age: null,
      dateBirth: new Date(),
      role: null,
      password: "",
      country: null,
      city: null,
      state: false,
    },
    editedItemUser: {
      name: "",
      lastName: "",
      documentIdType: null,
      documentId: "",
      email: "",
      age: null,
      dateBirth: new Date(),
      role: null,
      password: "",
      country: null,
      city: null,
      state: false,
    },
  }),

  validations() {
    return {
      editedItemUser: {
        name: { required },
        lastName: { required },
        email: { required, email },
        documentIdType: { required },
        documentId: { required },
        dateBirth: { required },
        role: { required },
        password: { required },
        country: { required },
        city: { required },
        state: { required },
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? this.t("newUser") : this.t("editUser");
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
      userStore.GET_USERS({ page: page, perPage: itemsPerPage }).then(() => {
        this.dessertsUsers = userStore.users.data;
        this.totalItems = userStore.users.items;
      });
    },

    editItem(item) {
      this.editedIndex = this.dessertsUsers.findIndex(
        (user) => user.id === { ...item }.id
      );
      this.editedItemUser = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dessertsUsers.indexOf(item);
      this.editedItemUser = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      userStore.DELETE_USER(this.editedItemUser.id).then(() => {
        this.initialize({ page: 1, itemsPerPage: 10 });
      });
      this.closeDelete();
    },

    close() {
      this.v$.$reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItemUser = Object.assign({}, this.defaultItemUser);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItemUser = Object.assign({}, this.defaultItemUser);
        this.editedIndex = -1;
      });
    },

    async save() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      if (this.editedIndex > -1) {
        userStore
          .UPDATE_USER({
            id: this.editedItemUser.id,
            data: this.editedItemUser,
          })
          .then(() => {
            this.initialize({ page: 1, itemsPerPage: 10 });
          });
      } else {
        userStore.CREATE_USER(this.editedItemUser).then(() => {
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
