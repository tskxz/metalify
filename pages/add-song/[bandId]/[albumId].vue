<script setup lang="ts">
import {ref} from "vue"
import {useROute, useRouter} from "vue-router"
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

const route = useRoute()
const bandId = Number(route.params.bandId)
const albumId = Number(route.params.albumId)

const songTitle = ref("")
const songYoutubeUrl = ref("")

onMounted(() => {

  if (typeof window !== "undefined") {
    userID.value = localStorage.getItem("userID");
  }
});


const router = useRouter()

const submitForm = async () => {
	try {
		const response = await fetch("/api/songs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: songTitle.value,
				youtubeUrl: songYoutubeUrl.value,
				bandId: bandId,
				albumId: albumId,
				userId: userID.value
			})
		})

		if(response.ok){
			alert("Som adicionado com sucesso!")
			router.push(`/songs/${albumId}/${bandId}`)
		} else {
			alert("Erro ao adicionar som")
		}
	} catch (error) {
		console.error("Erro ao enviar formulario: ", error)
		alert("Erro ao adicionar som")
	}
}
</script>

<template>
	<template v-if="isAuthenticated">
		<v-container>
			<v-card class="pa-4 mx-auto" max-width="500">
				<v-card-title class="text-h5">Adicionar Novo Som</v-card-title>
				<v-divider class="mb-4"></v-divider>
				<v-form @submit.prevent="submitForm">
					<v-text-field v-model="songTitle" label="Titulo do som" required></v-text-field>
					<v-text-field v-model="songYoutubeUrl" label="Youtube URL" required></v-text-field>

					<v-btn type="submit" color="primary" class="mt-4">Adicionar</v-btn>
					<v-btn color="secondary" class="mt-4 ml-2" @click="router.back()">Cancelar</v-btn>
				</v-form>
			</v-card>
		</v-container>
		</template>
    <template v-else>
        
    </template>
</template>