<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const {username, userID} = storeToRefs(authStore);

authStore.loadUserFromLocalStorage();

const isAuthenticated = computed(() => !!username.value);
const isLoading = ref(true);

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

onMounted(() => {
  if (isAuthenticated.value) {
    router.push("/");
  } else {
    isLoading.value = false;
  }
});


const login = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const { data, error } = await useFetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    if (error.value) {
      throw new Error(error.value.statusMessage);
    }

    authStore.setUser(data.value);

    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <template v-if="isLoading">
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-container>
  </template>
  
   <template v-else>
    <v-container class="d-flex justify-center align-center" style="height: 100vh">
      <v-card width="400" class="pa-5">
        <v-card-title class="text-center">Login</v-card-title>

        <v-card-text>
          <v-alert v-if="errorMessage" type="error" class="mb-4">
            {{ errorMessage }}
          </v-alert>

          <v-form @submit.prevent="login">
            <v-text-field
              label="Email"
              v-model="email"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              required
            ></v-text-field>

            <v-btn type="submit" color="primary" block :loading="loading">
              Entrar
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
        <p>Não tem uma conta? <NuxtLink to="/register">Criar conta</NuxtLink></p>
      </v-card-actions>
      </v-card>
    </v-container>
  </template>
</template>
