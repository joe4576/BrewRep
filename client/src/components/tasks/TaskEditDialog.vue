<script setup lang="ts">
import { client } from "@/api/client";
import {
  BaseDialogEmits,
  BaseDialogProps,
} from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { useUserStore } from "@/store/userStore";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import { v4 as uuid } from "uuid";
import { onMounted, ref, watch } from "vue";

interface TaskEditDialogProps extends BaseDialogProps {
  taskId?: string;
}

interface TaskEditDialogEmits extends BaseDialogEmits {}

const props = defineProps<TaskEditDialogProps>();
const emit = defineEmits<TaskEditDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const userStore = useUserStore();

const internalTask = ref<Task | null>(null);
const users = ref<User[]>([]);

watch(
  model,
  async () => {
    if (!model) {
      return;
    }

    users.value = await client.user.getAllUsers.query();

    if (props.taskId) {
      internalTask.value = await client.task.getTask.query(props.taskId);
      return;
    }

    // close the dialog if these values are falsy (should never be)
    if (!userStore.user?.id || !userStore.tenantId) {
      return (model.value = false);
    }

    internalTask.value = {
      id: uuid(),
      createdByUserId: userStore.user.id,
      dateCreated: new Date(),
      dateDue: new Date(),
      description: "",
      tenantId: userStore.tenantId,
    };
  },
  { immediate: true }
);
</script>

<template>
  <br-dialog v-model="model" @accept="$emit('accept', internalTask)">
    <v-row v-if="internalTask">
      <v-col cols="12" class="py-0">
        <br-text v-model="internalTask.description" label="Description" />
      </v-col>
      <v-col cols="12" class="py-0">
        <br-date v-model="internalTask.dateDue" label="Date Due" />
      </v-col>
      <v-col cols="12" class="py-0">
        <br-dropdown
          v-model="internalTask.assignedToUserId"
          :items="users"
          :item-title="(item: User) => item.name"
          :item-value="(item: User) => item.id"
          label="Assign to user"
        />
      </v-col>
    </v-row>
  </br-dialog>
</template>
