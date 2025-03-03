<script setup lang="ts">
// TODO: EDITAR BANDA
import { useBands } from "@/composables/useBands";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

const props = defineProps<{ genre: string }>();

const { bands } = useBands(props.genre);

const router = useRouter();

const goBack = () => {
    router.back();
};

const showModal = ref(false);
const bandToDelete = ref<number | null>(null);

const confirmDelete = (id: number) => {
    bandToDelete.value = id;
    showModal.value = true;
};

const deleteBand = async (id: number) => {
    try {
        await fetch(`${config.public.apiBase}/bands/${bandToDelete.value}`, {
            method: "DELETE",
        });
        bands.value = bands.value.filter(
            (band) => band.id !== bandToDelete.value,
        );
    } catch (e) {
        console.error("Error deleting band:", e);
    } finally {
        showModal.value = false;
        bandToDelete.value = null;
    }
};
</script>

<template>
    <v-container>
        <v-card class="pa-4">
            <v-card-title class="text-h5"
                >🎸 Bandas de {{ genre }}</v-card-title
            >
            <v-divider class="mb-4"></v-divider>
             
              <v-card-actions>
        <v-btn color="primary" @click="goBack" class="mb-4">⬅ Voltar</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="primary" to="/add-band" class="mb-4">➕ Adicionar Banda</v-btn>
      </v-card-actions>
        <v-spacer></v-spacer>
            <v-row>
                <v-col
                    v-for="band in bands"
                    :key="band.id"
                    cols="12"
                    md="6"
                    lg="4"
                >
                    <v-card>
                        <v-img
                            v-if="band.imageUrl"
                            :src="band.imageUrl"
                            height="600px"
                            cover
                        ></v-img>
                        <v-card-title>{{ band.name }}</v-card-title>
                        <v-card-actions>
                            <v-btn color="primary" :to="`/band/${band.id}`"
                                >Ver Albums</v-btn
                            >
                            <v-btn color="red" @click="confirmDelete(band.id)"
                                >Apagar</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>

    <v-dialog v-model="showModal" max-width="400">
        <v-card>
            <v-card-title class="text-h5">Confirmar acao</v-card-title>
            <v-card-text>Tem a certeza que quer apagar esta banda?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" @click="showModal = false">Cancelar</v-btn>
                <v-btn color="red" @click="deleteBand">Apagar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
