<template>
  <section>
    <div id="left-side">
      <canvas id="canvas" class="canvas-back"></canvas>
      <div class="backRight"></div>
      <div class="backLeft"></div>
    </div>

    <div id="right-side">
      <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </section>
</template>
<route lang="yaml">
meta:
  layout: web
  bgColor: yellow
</route>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthentication } from "@/stores/userAuthentication";

const authentication = useAuthentication();

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  authentication.POS_LOGIN();
  router.push("/BillingView");
  //   try {
  //     // Aquí puedes hacer una llamada a tu API de autenticación
  //     const response = await fetch("https://api.example.com/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username.value,
  //         password: password.value,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Login failed");
  //     }

  //     const data = await response.json();
  //     // Guardar el token de autenticación en el almacenamiento local
  //     localStorage.setItem("authToken", data.token);
  //     // Redirigir al usuario a la página principal
  //     router.push("/");
  //   } catch (err) {
  //     error.value = "Login failed. Please check your credentials and try again.";
  //   }
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

.login div {
  margin-bottom: 1em;
}

.login label {
  margin-bottom: 0.5em;
  color: #333333;
  display: block;
}

.login input {
  border: 1px solid #cccccc;
  padding: 0.5em;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}

.login button {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
}

.login button:hover {
  background-color: #0056b3;
}

.login p {
  color: red;
}

section {
  display: flex;
  height: 100vh;
  #left-side,
  #right-side {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #right-side {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>
