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
            <v-btn
              prepend-icon="$vuetify"
              v-bind="props"
              :color="st_button.color"
              :variant="st_button.variant"
            >
              {{ $t("newUser") }}
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
                        v-model.trim="editedItemUser.name"
                        :label="$t('name')"
                        :counter="10"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.name.$errors)
                        "
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
                        @blur="v$.editedItemUser.documentId.$touch"
                        @input="v$.editedItemUser.documentId.$touch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-date-input
                        v-model="editedItemUser.dateBirth"
                        :label="$t('dateBirth')"
                        hide-details="true"
                        required
                        :error-messages="
                          getErrorMessage(v$.editedItemUser.dateBirth.$errors)
                        "
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
                        :variant="st_input.variant"
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
          <v-card prepend-icon="mdi-earth" :title="$t('deleteUser')">
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

import { useUserStore } from "@/stores/user";
import { useCommonStore } from "@/stores/common";

import { storeToRefs } from "pinia";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();

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
