<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const {userID} = storeToRefs(authStore);

authStore.loadUserFromLocalStorage();

const isAuthenticated = computed(() => !!userID.value);
const isLoading = ref(true);

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref(null);
const loading = ref(false);

onMounted(() => {
  if (isAuthenticated.value) {
    router.push("/");
  } else {
    isLoading.value = false;
  }
});

const rules = {
  required: (value) => !!value || "Campo obrigatório",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail inválido",
  min: (v) => v.length >= 6 || "Mínimo de 6 caracteres",
  matchPassword: (v) => v === password.value || "As palavras-passes não coincidem",
};

const registerUser = async () => {
  errorMessage.value = null;
  loading.value = true;

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "Todos os campos são obrigatórios!";
    loading.value = false;
    return;
  }

  try {
    const { data, error } = await useFetch("/api/auth/register", {
      method: "POST",
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    });

    if (error.value) throw new Error(error.value.statusMessage);

    alert("Conta criada com sucesso!");
    router.push("/login");
  } catch (err) {
    errorMessage.value = err.message || "Erro ao criar conta!";
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
  <v-container>
    <v-card class="pa-4 mx-auto" max-width="500">
      <v-card-title class="text-h5 text-center"> Criar Conta </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="registerUser">
          <v-text-field v-model="username" label="Nome de utilizador" :rules="[rules.required]"></v-text-field>
          <v-text-field v-model="email" label="E-mail" type="email" :rules="[rules.required, rules.email]"></v-text-field>
          <v-text-field v-model="password" label="Palavra-Passe" type="password" :rules="[rules.required, rules.min]"></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirmar Palavra-Passe" type="password" :rules="[rules.required, rules.matchPassword]"></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mb-3">
            {{ errorMessage }}
          </v-alert>

          <v-btn type="submit" block color="primary" :loading="loading">
            Criar Conta
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <p>Já tem uma conta? <NuxtLink to="/login">Entrar</NuxtLink></p>
      </v-card-actions>
    </v-card>
  </v-container>
  </template>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
