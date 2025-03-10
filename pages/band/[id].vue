<script setup lang="ts">

import { useRoute } from "vue-router";
import { useAlbums } from "@/composables/useAlbums";
import { useBand } from "@/composables/useBand";
import { computed } from "vue";
import {useRouter} from "vue-router";
import {useRuntimeConfig} from "#app"
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

const config = useRuntimeConfig()

const route = useRoute();
const bandId = Number(route.params.id);

    onMounted(() => {

      if (typeof window !== "undefined") {
        userID.value = localStorage.getItem("userID");
      }
    });

const { albums } = useAlbums(bandId);
const {band} = useBand(bandId)


const router = useRouter()

const goBack = () => {
  router.back()
}

const goToAddAlbum = () => {
  router.push(`/add-album/${bandId}`);
};

const goToEditAlbum = (albumId: number) => {
  router.push(`/edit-album/${bandId}/${albumId}`)
}

const goToSongs = (albumId: number) => {
  router.push(`/songs/${albumId}/${bandId}`)
}


const showModal = ref(false);
const albumToDelete = ref<number | null>(null)

const confirmDelete = (id: number) => {
  albumToDelete.value = id
  showModal.value = true
};

const deleteAlbum = async (id: number) => {
  try {
    await fetch(`${config.public.apiBase}/albums/${albumToDelete.value}`, {
      method: "DELETE",
    });
    albums.value = albums.value.filter((album) => album.id !== albumToDelete.value)
  } catch (e) {
    console.error("Erro ao apagar album:", e)
  } finally {
    showModal.value = false;
    albumToDelete.value = null;
  }
}


</script>

<template>
  <template v-if="isAuthenticated">
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
          <v-card-title v-if="album.userId != userID">Nao tens permissao para ver o album</v-card-title>
          <v-card v-else>
            <v-img v-if="album.imageUrl" :src="album.imageUrl" height="600px" cover></v-img>
            <v-card-title>{{ album.title }}</v-card-title>
            <v-card-actions>
                <v-btn color="primary" @click="goToSongs(album.id)">Ver Sons</v-btn>
                <v-btn color="orange" @click="goToEditAlbum(album.id)">Editar Album</v-btn>
                   <v-btn color="red" @click="confirmDelete(album.id)">Apagar</v-btn>
                </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  </template>
    <template v-else>
        
    </template>

  <v-dialog v-model="showModal" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Confirmar acao</v-card-title>
      <v-card-text>Tem a certeza que quer apagar este album?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="showModal=false">Cancelar</v-btn>
        <v-btn color="red" @click="deleteAlbum">Apagar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>

