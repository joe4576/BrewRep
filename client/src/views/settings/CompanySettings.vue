<script setup lang="ts">
import { client } from "@/api/client";
import { useUserStore } from "@/store/userStore";
import { Tenant } from "@server/models/tenant.model";
import { User } from "@server/models/user.model";
import { onMounted, ref } from "vue";

type TenantAndUser = Tenant & {
  users: User[];
};
const userStore = useUserStore();

const availableTenants = ref<TenantAndUser[]>([]);

onMounted(async () => {
  if (!userStore.user?.id) {
    return;
  }

  availableTenants.value = await client.tenant.getAllTenants.query(
    userStore.user.id
  );
});
</script>

<template>
  <div>hello</div>
</template>
