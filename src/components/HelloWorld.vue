<template>
  <p>count : {{ count }}</p>
  <p>doubleCount : {{ doubleCount }}</p>
  <p>user : {{ user }}</p>
  <hr>
  <button @click="increment">incrementare</button>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count2++">count is {{ count2 }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

import { ref } from "vue";
// Store - Getter
const { count, user, doubleCount } = storeToRefs(useUserStore());
// Action
const { increment } = useUserStore();

defineProps({
  msg: String,
});

const count2 = ref(0);
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
