<script setup lang="ts">
import { client } from "@/api/client";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { Tenant } from "@server/models/tenant.model";
import { v4 as uuid } from "uuid";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { form } = useFormValidation();
const { required } = useValidationRules();
const router = useRouter();

const name = ref("");

const [loading, createTenant] = useLoadingState(async () => {
  const formValid = await form.value?.validate();

  if (!formValid?.valid) {
    return;
  }

  const newTenant: Tenant = {
    id: uuid(),
    dateCreated: new Date(),
    name: name.value,
  };

  await client.tenant.createTenant.mutate(newTenant);

  await router.push({
    name: "tenant-selector",
  });
});
</script>

<template>
  <v-container>
    <v-row class="align-self-center">
      <v-col cols="12">
        <v-card class="create-tenant-card">
          <v-card-title>Create a new tenant</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="createTenant">
              <br-text v-model="name" label="Name" :rules="[required]" />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              variant="text"
              color="primary"
              :loading="loading"
              @click="createTenant"
            >
              Create
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.create-tenant-card {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>
