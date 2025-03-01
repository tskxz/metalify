<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const items = [
    { title: "Nu-Metal", route: "/bands-nu-metal" },
    { title: "Black-Metal", route: "/bands-black-metal" },
    { title: "Groove-Metal", route: "/bands-groove-metal" },
    { title: "Death-Metal", route: "/bands-death-metal" },
    { title: "Trash-Metal", route: "/bands-thrash-metal" },
];

const goToGenre = (route) => {
    router.push(route);
};
</script>

<template>
    <v-card class="mx-auto" max-width="400" style="margin: 100px;">
        <v-card-title class="text-h5">🎸 Metalify</v-card-title>
        <v-divider></v-divider>
        <v-list>
            <v-list-item
                v-for="item in items"
                :key="item.route"
                @click="goToGenre(item.route)"
                class="cursor-pointer"

            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>
