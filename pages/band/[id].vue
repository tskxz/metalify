<script setup>
// TODO: Modal Apagar Albuns
import { useRoute } from "vue-router";
import { useAlbums } from "@/composables/useAlbums";
import { useBand } from "@/composables/useBand";
import { computed } from "vue";
import {useRouter} from "vue-router";

const route = useRoute();
const bandId = Number(route.params.id);

const { albums } = useAlbums(bandId);
const {band} = useBand(bandId)

const router = useRouter()

const goBack = () => {
  router.back()
}

const goToAddAlbum = () => {
  router.push(`/add-album/${bandId}`);
};

</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Albums da banda {{ band?.name || "Carregando..." }}</v-card-title>
      <v-divider class="mb-4"></v-divider>
      
       <v-card-actions>
        <v-btn color="primary" @click="goBack" class="mb-4">⬅ Voltar</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="goToAddAlbum" class="mb-4">➕ Adicionar Album</v-btn>

      </v-card-actions>
      <v-row>
        <v-col v-for="album in albums" :key="album.id" cols="12" md="6" lg="4">
          <v-card>
            <v-img v-if="album.imageUrl" :src="album.imageUrl" height="600px" cover></v-img>
            <v-card-title>{{ album.title }}</v-card-title>
            <v-card-actions>
                <v-btn color="primary">Ver Sons</v-btn>
                   <v-btn color="red">Apagar</v-btn>
                </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  
</template>

