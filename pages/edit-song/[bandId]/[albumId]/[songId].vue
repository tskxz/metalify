<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router"
import {useSong} from "@/composables/useSong"

const route = useRoute()
const router = useRouter()


const bandId = Number(route.params.bandId)
const albumId = Number(route.params.albumId)
const songId = Number(route.params.songId)

const songTitle = ref("")
const songYoutubeUrl = ref("")

const {song} = useSong(songId)

watch(song, (newSong) => {
	if(newSong){
		songTitle.value = newSong.title
		songYoutubeUrl.value = newSong.youtubeUrl
	}
})

const submitForm = async() => {
	try {
		const response = await fetch(`/api/songs/${songId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: songTitle.value,
				youtubeUrl: songYoutubeUrl.value,
			})
		})

		if(response.ok){
			alert("Album atualizado com sucesso")
			router.push(`/songs/${albumId}/${bandId}`)
		} else {
			alert("Erro ao atualiar o album")
		}
	} catch(error) {
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
        <v-text-field v-model="songTitle" label="Título do som" required></v-text-field>
        <v-text-field v-model="songYoutubeUrl" label="URL do youtube" required></v-text-field>

        <v-btn type="submit" color="primary" class="mt-4">Salvar</v-btn>
        <v-btn color="secondary" class="mt-4 ml-2" @click="router.back()">Cancelar</v-btn>
      </v-form>
    </v-card>
  </v-container>
 </template>