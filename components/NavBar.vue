<template>
    <v-app-bar app color="primary" dark>
        <router-link
            to="/"
            style="text-decoration: none; color: white; padding-left: 16px"
        >
            <v-toolbar-title>Metalify</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn to="/add-band" color="white">➕ Adicionar Banda</v-btn>
    </v-app-bar>
</template>
