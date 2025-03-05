<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useSongs} from "@/composables/useSongs";
import {useAlbum} from "@/composables/useAlbum"
import { useBand } from "@/composables/useBand";
import {computed} from "vue"
import {useRuntimeConfig} from "#app"
import {storeToRefs} from "pinia"
import {useAuthStore} from "@/stores/auth"

const authStore = useAuthStore()
const {username, userID} = storeToRefs(authStore);

authStore.loadUserFromLocalStorage();

const config = useRuntimeConfig()

const route = useRoute()
const albumId = Number(route.params.albumId)
const bandId = Number(route.params.bandId)

const {songs} = useSongs(albumId)
const {album} = useAlbum(albumId) 
const { band } = useBand(bandId);

const router = useRouter()

const goBack = () => {
  router.back()
}

const gotoAddSong = () => {
  router.push(`/add-song/${bandId}/${albumId}`)
}

const gotoEditSong = (songId: number) => {
  router.push(`/edit-song/${bandId}/${albumId}/${songId}`)
}

const extractVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const showModal = ref(false);
const songToDelete = ref<number | null>(null)
const confirmDelete = (id: number) => {
  songToDelete.value = id
  showModal.value = true
}

const deleteSong = async(id: number) => {
  try{
    await fetch(`${config.public.apiBase}/songs/${songToDelete.value}`, {
      method: "DELETE"
    });
    songs.value = songs.value.filter((song) => song.id !== songToDelete.value)
  } catch (e) {
    console.error("Erro ao apagar som:", e)
  } finally {
    showModal.value = false;
    songToDelete.value = null;
  }
}
</script>

<template>
	<v-container>
    <v-card class="pa-4">
      <v-card-title>
      	                Sons do álbum "{{ album?.title || 'Carregando...'}}" da banda {{ band?.name || "Carregando..." }}


      </v-card-title>
      <v-divider class="mb-4"></v-divider>
      
       <v-card-actions>
       <v-btn color="primary" @click="goBack" class="mb-4">⬅ Voltar</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="gotoAddSong" class="mb-4">➕ Adicionar Som</v-btn>

      </v-card-actions>
      <v-row>
        <v-col v-for="song in songs" :key="song.id" cols="12" md="6" lg="4">
          <v-card-title v-if="song.userId != userID">Nao tens permissao para ver o som</v-card-title>
          <v-card v-else>
            
            <v-card-title>{{ song.title }}</v-card-title>
            <v-card-text v-if="song.youtubeUrl">
			    <iframe
			      width="100%"
			      height="315"
			      :src="`https://www.youtube.com/embed/${extractVideoId(song.youtubeUrl)}`"
			      frameborder="0"
			      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			      allowfullscreen
			    ></iframe>
          
  			</v-card-text>
            <v-card-actions>
                
                <v-btn color="orange" @click="gotoEditSong(song.id)">Editar Som</v-btn>
                   <v-btn color="red" @click="confirmDelete(song.id)">Apagar</v-btn>
                </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-dialog v-model="showModal" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Confirmar acao</v-card-title>
      <v-card-text>Tem a certeza que quer apagar este som?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="showModal=false">Cancelar</v-btn>
        <v-btn color="red" @click="deleteSong">Apagar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>