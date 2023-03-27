<script lang="ts" setup>
import { client } from "@/api/client";
import { ref } from "vue";
const name = ref("");
const uid = ref("");

const registerUser = async () => {
  let user = await client.authentication.register.mutate({
    name: name.value,
    uid: uid.value,
  });

  console.log(user);
};
</script>

<template>
  <v-container>
    <v-text-field v-model="name" label="name"></v-text-field>
    <v-text-field v-model="uid" label="uid"></v-text-field>
    <v-btn @click="registerUser">Register USer</v-btn>
  </v-container>
</template>
