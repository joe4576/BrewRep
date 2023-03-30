<script setup lang="ts">
import { client } from "@/api/client";
import { onBeforeMount, ref } from "vue";
import { TenantGroup } from "@server/models/tenantGroup.model";
import { Tenant } from "@server/models/tenant.model";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import cookieService from "@/services/cookieService";

const userStore = useUserStore();
const router = useRouter();

type TenantGroupWithTenants = TenantGroup & { tenants: Tenant[] };

const allResults = ref<TenantGroupWithTenants[]>([]);

onBeforeMount(async () => {
  allResults.value = await client.tenant.getAllTenantsAndTenantGroups.query();
  console.log(allResults);
});

const signInToTenant = async (tenantGroupId: string, tenantId: string) => {
  cookieService.setCookie("tenantgroupid", tenantGroupId);
  cookieService.setCookie("tenantid", tenantId);
  await userStore.load();
  await router.push({
    name: "home",
  });
};
</script>

<template>
  <v-container>
    <v-row v-for="tenantGroup in allResults" :key="tenantGroup.id">
      {{ tenantGroup.name }}
      <br-btn
        v-for="tenant in tenantGroup.tenants"
        :key="tenant.id"
        @click="signInToTenant(tenantGroup.id, tenant.id)"
      >
        {{ tenant.name }}
      </br-btn>
    </v-row>
  </v-container>
</template>
