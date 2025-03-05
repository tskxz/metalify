<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router"
import { storeToRefs } from "pinia";
import {useAuthStore} from "@/stores/auth"
import { useBand } from "@/composables/useBand";

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
const bandId = Number(route.params.bandId);

onMounted(() => {

  if (typeof window !== "undefined") {
    userID.value = localStorage.getItem("userID");
  }
});

const albumTitle = ref("")
const albumImageUrl = ref("")

const router = useRouter()

const {band} = useBand(bandId)

const submitForm = async () => {
	try {
		if(band.value.userId != userID.value){
			alert("Nao tem permissao para adicionar este album")
			return;
		}

		const response = await fetch(`/api/albums`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: albumTitle.value,
				imageUrl: albumImageUrl.value,
				bandId: band.value.id,
				userId: userID.value
			})
		})

		if(response.ok){
			alert("Album adicionado com sucesso!")

			router.push(`/band/${bandId}`)
		} else {
			alert("Erro ao adicionar o album")
		}
	} catch (err) {
		console.error("Erro ao enviar o formulario", err)
		alert("Erro ao adicionar o album")
	}
}
</script>

<template>
	<template v-if="isAuthenticated">
	<v-container>
		<v-card class="pa-4 mx-auto" max-width="500">
			<v-card-title class="text-h5">Adicionar Novo album da banda</v-card-title>
			<v-divider class="mb-4"></v-divider>
			<v-form @submit.prevent="submitForm">
				<v-text-field v-model="albumTitle" label="Titulo do album" required></v-text-field>
				<v-text-field v-model="albumImageUrl" label="Imagem do album" required></v-text-field>

				<v-btn type="submit" color="primary" class="mt-4">Adicionar</v-btn>
				<v-btn color="secondary" class="mt-4 ml-2" @click="router.back()">Cancelar</v-btn>
			</v-form>
		</v-card>
	</v-container>
	 </template>
    <template v-else>
        
    </template>
</template>