<script lang="ts" setup>
import { client } from "@/api/client";
import { onMounted, ref } from "vue";
import type { User } from "@server/server";

const user = ref<User>();

onMounted(async () => {
  user.value = await client.createUser.mutate({
    name: "Jeo12321321",
  });
  const test = await client.user.getAllUsers.query({
    valid: true,
  });

  console.log(test);
});
</script>

<template>
  <div>
    <p v-if="user">{{ user }}</p>
  </div>
</template>
