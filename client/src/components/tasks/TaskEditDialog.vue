<script setup lang="ts">
import { client } from "@/api/client";
import useLoadingState from "@/composables/useLoadingState";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import cloneDeep from "lodash.clonedeep";
import { computed, onMounted, ref } from "vue";

interface TaskEditDialogProps {
  task: Task;
  users: User[];
  isCreating?: boolean;
}

interface TaskEditDialogEmits {
  (e: "accept", v: void): void;
}

const props = withDefaults(defineProps<TaskEditDialogProps>(), {
  isCreating: false,
});

const emit = defineEmits<TaskEditDialogEmits>();

const internalTask = ref<Task | null>(null);

const isCreating = computed(() => props.isCreating);

onMounted(() => {
  internalTask.value = cloneDeep(props.task);
});

const [loading, saveOrCreate] = useLoadingState(async () => {
  if (!internalTask.value) {
    return;
  }

  props.isCreating
    ? await client.task.createTask.mutate(internalTask.value)
    : await client.task.saveTask.mutate(internalTask.value);

  emit("accept");
});
</script>

<template>
  <br-dialog
    :label="isCreating ? 'Add new task' : 'Edit Task'"
    :confirm-text="isCreating ? 'Add' : 'Edit'"
    :loading="loading"
    @accept="saveOrCreate"
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
          label="Assign to user"
        />
      </v-col>
    </v-row>
  </br-dialog>
</template>
