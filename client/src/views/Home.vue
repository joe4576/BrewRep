<script lang="ts" setup>
import { client } from "@/api/client";
import { onMounted, ref } from "vue";
import { User } from "@server/models/user.model";

const users = ref<User[]>([]);
const userNameInput = ref("");

const refresh = async () => {
  users.value = await client.user.getAllUsers.query();
};

const createNewUser = async () => {
  if (userNameInput.value.trim().length === 0) {
    return;
  }

  await client.user.createUser.mutate({
    name: userNameInput.value,
  });

  await refresh();
};

onMounted(refresh);
</script>

<template>
  <div>
    <p v-if="users">{{ users }}</p>
  </div>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="userNameInput" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn @click="createNewUser">Create new user</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
