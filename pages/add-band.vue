<script setup lang="ts">
import {ref} from "vue"
import {useRouter} from "vue-router"
import { storeToRefs } from "pinia";
import {useAuthStore} from "@/stores/auth"

const authStore = useAuthStore()
const {username, userID} = storeToRefs(authStore);

authStore.loadUserFromLocalStorage();

const isAuthenticated = computed(() => !!username.value);
const isLoading = ref(true);

onMounted(() => {
   setTimeout(() => {
        if (!isAuthenticated.value) {
            router.push("/login");
        }
        isLoading.value = false;
    }, 500);
});

const router = useRouter()


onMounted(() => {

  if (typeof window !== "undefined") {
    userID.value = localStorage.getItem("userID");
  }
});


const band = ref({
    name: "",
    genre: "",
    imageUrl: "",
    userId: userID
})

const successMessage = ref("")
const errorMessage = ref("")

const submitBand = async() => {
    try {
        const res = await fetch("/api/bands", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(band.value),
        });

        if(!res.ok) throw new Error("Erro ao adicionar a banda")

        successMessage.value = "Banda adicionada com sucesso!"
        errorMessage.value = "";

        band.value = {
            name: "",
            genre: "",
            imageUrl: "",
            userId: userID
        }

        setTimeout(() => router.back(), 1500);
    } catch (error) {
        errorMessage.value = "Ocorreu um erro ao adicionar a banda: " + error.message;
        successMessage.value = "";
    }
}
</script>

<template>
    <template v-if="isAuthenticated">
        <v-container>
            <v-card class="pa-4 mx-auto" max-width="500">
                <v-card-title class="text-h5">Adicionar Nova banda</v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-form @submit.prevent="submitBand">
                    <v-text-field v-model="band.name" label="Nome da Banda" required></v-text-field>
                    <v-select v-model="band.genre" label="Genero" :items="['Nu-Metal', 'Black-Metal', 'Groove-Metal', 'Thrash-Metal', 'Death-Metal']" required></v-select>
                    <v-text-field v-model="band.imageUrl" label="Imagem da Banda" required></v-text-field>
                    <v-alert v-if="successMessage" type="success" class="mt-3">{{ successMessage }}</v-alert>
                    <v-alert v-if="errorMessage" type="error" class="mt-3">{{ errorMessage }}</v-alert>

                    <v-btn type="submit" color="primary" class="mt-4">Adicionar</v-btn>
                    <v-btn color="secondary" class="mt-4 ml-2" @click="router.back()">Cancelar</v-btn>
                </v-form>
            </v-card>
        </v-container>
    </template>
    <template v-else>
        
    </template>
</template>