<template>
  <div class="loading-container">
    <!-- <div class="loading-spinner"></div> -->
    <div class="containerCircle">
      <div class="circle inner"></div>
      <div class="circle outer"></div>
    </div>
    <img class="img" :src="themeStore.theme.logo" alt="Imagen subida" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();

onMounted(() => {
  gsap.to(".loading-spinner", {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: "linear",
  });

  gsap.from(".title span", {
    duration: 3,
    delay: 3,
    opacity: 0,
    x: -50,
    ease: "elastic",
    stagger: {
      each: 0.2,
      from: "start",
    },
  });

  //   gsap.from(".img", {
  //     duration: 3,
  //     delay: 0.7,
  //     opacity: 0,
  //     y: 70,
  //     ease: "expo.inOut",
  //     stagger: {
  //       each: 0.2,
  //       from: "center",
  //     },
  //   });

  const tl = gsap.timeline({
    defaults: {},
  });

  gsap.defaults({
    repeat: -1,
    width: "50vw",
    height: "50vw",
    opacity: 0,
    duration: 1.5,
  });

  gsap.to(".circle.inner", {
    delay: 0.6,
  });

  gsap.to(".circle.outer", {});
});
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(34, 34, 34, 0.8);
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #000;
  border-radius: 50%;
}
img {
  display: block;
  max-width: 200px;
  width: 100%;
  height: auto;
}

.containerCircle {
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.circle {
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: transparent;

  &.inner {
    position: absolute;
  }

  &.outer {
    position: relative;
  }
}
</style>