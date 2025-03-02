<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router"
import {useAlbum} from "@/composables/useAlbum"

const route = useRoute()
const router = useRouter()

const bandId = Number(route.params.bandId)
const albumId = Number(route.params.albumId)

const albumTitle = ref("")
const albumImageUrl = ref("")

const {album} = useAlbum(albumId)


watch(album, (newAlbum) => {
	if(newAlbum){
		albumTitle.value = newAlbum.title
		albumImageUrl.value = newAlbum.imageUrl
	}
})

const submitForm = async() => {
	try {
		const response = await fetch(`/api/albums/${albumId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: albumTitle.value,
				imageUrl: albumImageUrl.value,
			})
		})

		if(response.ok){
			alert("Album atualizado com sucesso")
			router.push(`/band/${bandId}`)
		} else {
			alert("Erro au atualizar o album")
		}
	} catch(e) {
		console.error("Erro ao enviar o formulario", e)
	}
}

</script>

<template>
  <v-container>
    <v-card class="pa-4 mx-auto" max-width="500">
      <v-card-title class="text-h5">Editar Álbum</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="albumTitle" label="Título do álbum" required></v-text-field>
        <v-text-field v-model="albumImageUrl" label="Imagem do álbum" required></v-text-field>

        <v-btn type="submit" color="primary" class="mt-4">Salvar</v-btn>
        <v-btn color="secondary" class="mt-4 ml-2" @click="router.back()">Cancelar</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>