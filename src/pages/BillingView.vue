<template>
  <v-container>
    <v-form>
      <v-row class="customer__section">
        <v-col>
          <v-autocomplete
            v-model="bill.customer"
            :items="people"
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="id"
            :label="$t('customer')"
            clearable
            chips
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :subtitle="item.raw.group"
                :title="item.raw.name"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-btn
            :variant="st_button.variant"
            :color="st_button.color"
            :size="st_button.size"
          >
            {{ $t("btn-create") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="services__section">
      <v-row v-for="(item, index) in bill.services" :key="item.id">
        <v-col>
          <v-autocomplete
            v-model="bill.services[index].category"
            :items="commonStore.categories"
            item-title="name"
            item-value="id"
            :label="$t('category')"
            :variant="st_input.variant"
            clearable
            :error-messages="bill.services[index].category_ms"
            @update:modelValue="
              setCategory_fn(item);
              fieldValidation('category');
            "
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="bill.services[index].service"
            :items="
              item.category != '5'
                ? filterByKey(commonStore.services, 'category', item.category)
                : inventoryList
            "
            item-title="name"
            item-value="id"
            :label="$t('service')"
            :variant="st_input.variant"
            clearable
            :error-messages="bill.services[index].service_ms"
            @update:modelValue="
              bill.services[index].suggestedValue = findByKey(
                commonStore.services,
                'id',
                item.service
              ).price;
              fieldValidation('service');
              fieldValidation('suggestedValue');
            "
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="bill.services[index].collaborator"
            :items="people"
            item-title="name"
            item-value="id"
            :label="$t('collaborator')"
            :variant="st_input.variant"
            clearable
            :error-messages="bill.services[index].collaborator_ms"
            @update:modelValue="fieldValidation('collaborator')"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <div class="d-flex">
            <v-text-field
              v-model.number="bill.services[index].suggestedValue"
              :label="$t('suggestedValue')"
              :counter="10"
              required
              :variant="st_input.variant"
              class="flex-grow-1"
              style="flex-basis: 80%"
              :error-messages="bill.services[index].suggestedValue_ms"
              @update:modelValue="fieldValidation('suggestedValue')"
            ></v-text-field>
            <v-btn
              color="error"
              size="small"
              icon="mdi-delete"
              class="ml-2 mt-2"
              @click="billDelete_fn(index)"
              v-if="bill.services.length > 1"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :variant="st_button.variant"
            :color="st_button.color"
            :size="st_button.size"
            @click="billAdd_fn"
          >
            {{ $t("btn-newService") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-row class="calculations__section">
      <v-col>
        <v-text-field
          v-model="billTotal"
          :label="$t('total')"
          :counter="10"
          required
          :variant="st_input.variant"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="billMoney"
          :label="$t('money')"
          :counter="10"
          required
          :variant="st_input.variant"
          @update:modelValue="billTotelChange_fn"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="billChange"
          :label="$t('change')"
          :counter="10"
          required
          :variant="st_input.variant"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="payment__section">
      <v-col>
        <v-autocomplete
          v-model="bill.typePayment"
          :items="commonStore.paymentMethods"
          item-title="name"
          item-value="id"
          :label="$t('typePayment')"
          :variant="st_input.variant"
          clearable
          :error-messages="error_typePayment"
          @update:modelValue="
            bill.typePayment != null
              ? (error_typePayment = '')
              : (error_typePayment = 'Seleccione un método de pago')
          "
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-btn
          :variant="st_button.variant"
          :color="st_button.color"
          :size="st_button.size"
          @click="billSave_fn"
        >
          <!-- :disabled="billTotal === 0" -->
          {{ $t("btn-bill") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerStore } from "@/stores/customer";
import { usethemeStore } from "@/stores/theme";
import { useCommonStore } from "@/stores/common";
import { useBillingStore } from "@/stores/billing";
import { useInventoryStore } from "@/stores/inventory";
import { findByKey, filterByKey } from "@/utils/utils";

const themeStore = usethemeStore();
const customerStore = useCustomerStore();
const commonStore = useCommonStore();
const billingStore = useBillingStore();
const inventoryStore = useInventoryStore();

const people = reactive([]);
const inventoryList = reactive([]);
const billTotal = ref(0);
const billMoney = ref(0);
const billChange = ref(0);
let bill = reactive({
  customer: null,
  total: billTotal,
  typePayment: null,
  cashier: commonStore.users.id,
  date: new Date(),
  state: false,
  services: [
    {
      id: 1,
      category: null,
      category_ms: null,
      service: null,
      service_ms: null,
      collaborator: null,
      collaborator_ms: null,
      suggestedValue: null,
      suggestedValue_ms: null,
    },
  ],
});

const billSet = {
  customer: null,
  total: billTotal,
  typePayment: null,
  cashier: commonStore.users.id,
  date: new Date(),
  state: false,
  services: [
    {
      id: 1,
      category: null,
      category_ms: null,
      service: null,
      service_ms: null,
      collaborator: null,
      collaborator_ms: null,
      suggestedValue: null,
      suggestedValue_ms: null,
    },
  ],
};

const friends = ref(null);
const isUpdating = ref(false);
const error_typePayment = ref("");

const { st_button, st_input } = storeToRefs(themeStore);

customerStore.GET_CUSTOMERS({ page: 1, perPage: 100 }).then(() => {
  people.push(...customerStore.customers.data);
});
inventoryStore.GET_INVENTARIES({ page: 1, perPage: 100 }).then(() => {
  inventoryList.push(...inventoryStore.products.data);
});

const billAdd_fn = () => {
  bill.services.push({
    id: bill.services.length + 1,
    category: null,
    service: null,
    collaborator: null,
    suggestedValue: null,
  });
};

const billTotal_fn = () => {
  const total = bill.services.reduce((sum, service) => {
    return sum + (service.suggestedValue || 0);
  }, 0);
  billTotal.value = total;
  return total;
};

const billTotelChange_fn = () => {
  billChange.value = billMoney.value - billTotal.value;
};

const setCategory_fn = (data) => {
  const index = bill.services.findIndex((item) => item.id === data.id);
  bill.services[index].service = null;
  bill.services[index].suggestedValue = null;
};

const billDelete_fn = (index) => {
  bill.services.splice(index, 1);
};

const billSave_fn = () => {
  isUpdating.value = true;
  fieldsValidation();
  validateBill();
  // Actualizar Varible reactiva
  Object.assign(bill, billSet);

  console.log("test");

  const dataFilter = removeMsKeys(bill);
  dataFilter.date = new Date();
  if (bill.state) {
    billingStore.CREATE_BILL(dataFilter).then(() => {
      isUpdating.value = false;
    });
  } else {
    console.log("Validación incorrecta");
  }
  isUpdating.value = false;
};
// Computed property

const fieldsValidation = () => {
  if (bill.typePayment === null) {
    error_typePayment.value = "Seleccione un método de pago";
  } else {
    error_typePayment.value = "";
  }
  fieldValidation("category");
  fieldValidation("service");
  fieldValidation("collaborator");
  fieldValidation("suggestedValue");
};

const fieldValidation = (data) => {
  const ms = data.concat("_ms");
  bill.services.forEach((item, index) => {
    if (item[data] === null) {
      item[ms] = "Campo requerido";
    } else {
      item[ms] = "";
    }
  });
};

const validateBill = (data) => {
  let servicesData = false;
  bill.services.forEach((item, index) => {
    if (
      item.category != null &&
      item.collaborator != null &&
      item.service != null &&
      item.suggestedValue != null
    ) {
      servicesData = true;
      return true;
    }
    servicesData = false;
    return false;
  });

  if (bill.typePayment != null && servicesData) {
    bill.state = true;
  } else {
    bill.state = false;
  }
};

const removeMsKeys = (obj) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (key.endsWith("_ms")) {
      delete newObj[key];
    } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
      if (Array.isArray(newObj[key])) {
        newObj[key] = newObj[key].map((item) =>
          typeof item === "object" && item !== null ? removeMsKeys(item) : item
        );
      } else {
        newObj[key] = removeMsKeys(newObj[key]);
      }
    }
  });
  return newObj;
};
// Observa cambios en services.category
watch(
  bill,
  (newValue, oldValue) => {
    billTotal_fn();
    billTotelChange_fn();
  },
  { deep: true }
);

onMounted(() => {});
</script>

<style lang="scss" scoped>
</style>