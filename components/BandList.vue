<script setup lang="ts">

import { useBands } from "@/composables/useBands"
import { useRouter } from "vue-router";

const props = defineProps<{genre: string}>()

const {bands} = useBands(props.genre)

const router = useRouter()

const goBack = () => {
    router.back();
}

</script>


<template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title class="text-h5">🎸 Bandas de {{ genre }}</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-btn color="primary" @click="goBack" class="mb-4">⬅ Voltar</v-btn>
        <v-row>
          <v-col v-for="band in bands" :key="band.id" cols="12" md="6" lg="4">
            <v-card>
              <v-card-title>{{ band.name }}</v-card-title>
              <v-card-actions>
                <v-btn color="primary" :to="`/bands/${band.id}`">Ver detalhes</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  