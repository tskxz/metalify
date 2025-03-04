<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const bandId = Number(route.params.bandId);

const userID = ref(null)

onMounted(() => {

  if (typeof window !== "undefined") {
    userID.value = localStorage.getItem("userID");
  }
});

const albumTitle = ref("")
const albumImageUrl = ref("")

const router = useRouter()

const submitForm = async () => {
	try {
		console.log("bandId:", bandId);
		const response = await fetch(`/api/albums`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: albumTitle.value,
				imageUrl: albumImageUrl.value,
				bandId: bandId,
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
	<v-container>
		<v-card class="pa-4 mx-auto" max-width="500">
			<v-card-title class="text-h5">Adicionar Novo album</v-card-title>
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