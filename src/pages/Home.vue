<template>
  <section class="home">
    <div id="introduction">
      <div class="slide"></div>
    </div>

    <!-- images -->
    <div class="images">
      <div class="img img-1"></div>
      <div class="img img-2"></div>
      <div class="img img-3"></div>
      <div class="img img-4"></div>
      <div class="img img-5"></div>
    </div>

    <!-- title -->
    <div class="title">
      <span>Nails Room</span>
    </div>
  </section>
  <!-- <Loading  /> -->
</template>
<route lang="yaml">
meta:
  layout: web
  bgColor: yellow
</route>

<script setup>
import { gsap } from "gsap";
import { ref } from "vue";

onMounted(() => {
  gsap.from(".title span", {
    duration: 3,
    delay: 3,
    opacity: 0,
    x: -50,
    ease: "elastic",
    stagger: {
      each: 0.2, // controls the stagger amount between each element
      from: "start", // controls the direction of the stagger
    },
  });

  gsap.from(".img", {
    duration: 3,
    delay: 0.7,
    opacity: 0,
    y: 70,
    ease: "expo.inOut",
    stagger: {
      each: 0.2, // controls the stagger amount between each element
      from: "center", // controls the direction of the stagger
    },
  });

  const tl = gsap.timeline({
    defaults: {
      duration: 1.0,
      ease: "expo.inOut",
    },
  });

  tl.to(".slide", { width: 0 }).to("#introduction", { height: 0 });
});
</script>

<style lang="scss" scoped>
.home {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    z-index: -1;
    background: linear-gradient(
      -45deg,
      #dce6f2,
      #0468bf,
      #048abf,
      #bfa288,
      #bf7449
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100vh;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
.images {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 1;
  .img {
    width: 140px;
    height: 300px;
    margin: 40px;
    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(0.8) contrast(1.2);
    }
  }
  .img-1 {
    transform: scale(1.1);
    background: url(https://i.postimg.cc/hvmRV7Nm/img-5.jpg) 50% 50% no-repeat;
    background-size: cover;
  }

  .img-2 {
    transform: scale(1.4);
    background: url(https://i.postimg.cc/Vs08x35N/img-4.jpg) 50% 50% no-repeat;
    background-size: cover;
  }

  .img-3 {
    transform: scale(1.1);
    background: url(https://i.postimg.cc/VLy8mDbW/img-3.jpg) 50% 50% no-repeat;
    background-size: cover;
  }

  .img-4 {
    transform: scale(1.4);
    background: url(https://i.postimg.cc/vBcsHKz3/img-2.jpg) 50% 50% no-repeat;
    background-size: cover;
  }

  .img-5 {
    transform: scale(1.1);
    background: url(https://i.postimg.cc/YSX7771v/img-1.jpg) 50% 50% no-repeat;
    background-size: cover;
  }
}

.title span {
  position: absolute;
  font-size: 55px;
  text-transform: uppercase;
  color: rgb(59, 58, 57);
  top: 80%;
  left: 50%;
  font-weight: bolder;
  letter-spacing: 20px;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

#introduction {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 105;
  background-color: #262626;
  cursor: pointer;
  overflow: hidden;
  top: 0;
  left: 0;
  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    background: #fff;
  }
}
</style>
