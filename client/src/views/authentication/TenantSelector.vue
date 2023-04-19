<script setup lang="ts">
import { client } from "@/api/client";
import cookieService from "@/services/cookieService";
import { useUserStore } from "@/store/userStore";
import { Tenant } from "@server/models/tenant.model";
import { User } from "@server/models/user.model";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

type TenantAndUser = Tenant & {
  users: User[];
};

const userStore = useUserStore();
const router = useRouter();

const availableTenants = ref<TenantAndUser[]>([]);

onMounted(async () => {
  if (!userStore.user?.id) {
    return;
  }

  if (userStore.isTenantSelected) {
    return await router.push({
      name: "home",
    });
  }

  availableTenants.value = await client.tenant.getAllTenants.query(
    userStore.user.id
  );
});

const userHasTenantGroups = computed(() => !!availableTenants.value.length);

const logInToTenant = async (tenantId: string) => {
  cookieService.setCookie("tenant-id", tenantId);
  userStore.tenantId = tenantId;

  await router.push({
    name: "home",
  });
};
</script>

<template>
  <v-container class="container text-center">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3">Create a new tenant</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" block>Create a new tenant</v-btn>
      </v-col>
    </v-row>
    <!-- Select a tenant group if the user already has some -->
    <template v-if="userHasTenantGroups">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4">Or login to an existing tenant</h2>
        </v-col>
      </v-row>
      <v-row v-for="tenant in availableTenants" :key="tenant.id">
        <v-col cols="12">
          <v-btn color="secondary" block @click="logInToTenant(tenant.id!)">
            {{ tenant.name }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
