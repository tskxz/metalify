<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);

const isLoading = ref(true);

const router = useRouter();

const isAuthenticated = computed(() => !!username.value);

onMounted(() => {
  authStore.loadUserFromLocalStorage();
  isLoading.value = false;
});

const logout = () => {
  authStore.logout();
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

    <template v-if="isLoading">
      <v-btn color="white" disabled>A carregar...</v-btn>
    </template>

    <template v-else>
      <template v-if="isAuthenticated">
        <v-btn color="white">Bem-vindo, {{ username }}</v-btn>
        <v-btn @click="logout" color="white">Sair</v-btn>
      </template>
      
      <v-btn v-else to="/login" color="white">Login</v-btn>
    </template>

    <v-btn to="/add-band" color="white">➕ Adicionar Banda</v-btn>
  </v-app-bar>
</template>
