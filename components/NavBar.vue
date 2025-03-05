<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userID = ref(null);
const username = ref(null);
const isLoading = ref(true);

const router = useRouter();

onMounted(() => {

  if (typeof window !== "undefined") {
    userID.value = localStorage.getItem("userID");
    username.value = localStorage.getItem("username");
  }
  isLoading.value = false
});

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
  }

  router.push("/login");
};
</script>

<template>
  <v-app-bar app color="primary" dark>
    <router-link
      to="/"
      style="text-decoration: none; color: white; padding-left: 16px"
    >
      <v-toolbar-title>Metalify</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
   <template v-if="!isLoading">
      <template v-if="username">
        <v-btn color="white">Bem-vindo, {{ username }}</v-btn>
        <v-btn @click="logout" color="white">Sair</v-btn>
      </template>
      <template v-else>
        <v-btn to="/login" color="white">Login</v-btn>
      </template>
    </template>
    <v-btn to="/add-band" color="white">➕ Adicionar Banda</v-btn>
  </v-app-bar>
</template>
