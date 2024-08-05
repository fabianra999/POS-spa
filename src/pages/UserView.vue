<!-- filename: UserView.vue -->
<template>
  <HeaderPagesCom :title="$t('userTitle')" :subTitle="$t('userSubTitle')" />
  <form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="state.name"
            :counter="10"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            :label="$t('name')"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>
          <v-text-field
            v-model="state.name"
            :counter="10"
            :error-messages="getErrorMessage(v$.name.$errors)"
            :label="$t('name')"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field :label="$t('lastName')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            :label="$t('email')"
            required
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field :label="$t('documentId')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field :label="$t('dateBirth')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-autocomplete
            :label="$t('role')"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field :label="$t('password')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-autocomplete
            :label="$t('country')"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-autocomplete
            :label="$t('city')"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-checkbox :label="$t('state')"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="state.select"
            :error-messages="v$.select.$errors.map((e) => e.$message)"
            :items="items"
            label="Item"
            required
            @blur="v$.select.$touch"
            @change="v$.select.$touch"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-checkbox
            v-model="state.checkbox"
            :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
            :label="$t('policies')"
            required
            @blur="v$.checkbox.$touch"
            @change="v$.checkbox.$touch"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="me-4" @click="v$.$validate">
            {{ $t("btn-submit") }}
          </v-btn>
          <v-btn @click="clear"> {{ $t("btn-clear") }} </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  inheritLocale: true,
  useScope: "global",
});

onMounted(() => {});

const initialState = {
  name: "",
  email: "",
  select: null,
  checkbox: null,
};

const state = reactive({
  ...initialState,
});

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

const rules = {
  name: { required },
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
function getErrorMessage(errors) {
  if (errors.length > 0) {
    const error = errors[0];
    return t(`validation.${error.$validator}`, error.$params);
  }
  return "";
}

const errorMessage = computed(() => {
  return "";
});
</script>

<style lang="scss" scoped>
</style>