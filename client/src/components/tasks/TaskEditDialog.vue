<script setup lang="ts">
import { client } from "@/api/client";
import useLoadingState from "@/composables/useLoadingState";
import { useUserStore } from "@/store/userStore";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import { v4 as uuid } from "uuid";
import { computed, onMounted, ref } from "vue";

interface TaskEditDialogProps {
  taskId?: string;
}

interface TaskEditDialogEmits {
  (
    e: "accept",
    v: {
      task: Task;
      isCreating: boolean;
    }
  ): void;
}

const props = defineProps<TaskEditDialogProps>();
defineEmits<TaskEditDialogEmits>();

const userStore = useUserStore();

const internalTask = ref<Task | null>(null);
const users = ref<User[]>([]);

const isCreating = computed(() => props.taskId === undefined);

const [loading, refresh] = useLoadingState(async () => {
  if (!userStore.user?.id || !userStore.tenantId) {
    return;
  }

  if (props.taskId) {
    internalTask.value = await client.task.getTask.query(props.taskId);
  } else {
    internalTask.value = {
      id: uuid(),
      createdByUserId: userStore.user.id,
      dateCreated: new Date(),
      dateDue: new Date(),
      description: "",
      tenantId: userStore.tenantId,
    };
  }

  users.value = await client.user.getAllUsers.query();
});

onMounted(refresh);
</script>

<template>
  <br-dialog
    :label="isCreating ? 'Add new task' : 'Edit Task'"
    :confirm-text="isCreating ? 'Add' : 'Edit'"
    @accept="
      $emit('accept', {
        task: internalTask,
        isCreating,
      })
    "
  >
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
          :loading="loading"
          label="Assign to user"
        />
      </v-col>
    </v-row>
  </br-dialog>
</template>
