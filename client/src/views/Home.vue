<script lang="ts" setup>
import { client } from "@/api/client";
import { onMounted, ref } from "vue";
import { User } from "@server/models/user.model";

const users = ref<User[]>([]);
const userNameInput = ref("");
const userIdInput = ref("");

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

const getUserById = async () => {
  const user = await client.user.getUserById.query(userIdInput.value);
  console.log(user);
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
        <v-text-field v-model="userNameInput" label="user name input" />
        <v-btn @click="createNewUser">Create new user</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="userIdInput" label="user id input" />
        <v-btn @click="getUserById">Get user by id</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
