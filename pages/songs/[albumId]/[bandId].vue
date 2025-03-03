<script setup lang="ts">
// TODO: EDITAR APAGAR E ADICIONAR SOM
import {useRoute, useRouter} from "vue-router";
import {useSongs} from "@/composables/useSongs";
import {useAlbum} from "@/composables/useAlbum"
import { useBand } from "@/composables/useBand";
import {computed} from "vue"
import {useRuntimeConfig} from "#app"

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

const extractVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

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
          <v-card>
            
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
                
                <v-btn color="orange">Editar Som</v-btn>
                   <v-btn color="red">Apagar</v-btn>
                </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>