<script setup lang="ts">
import { client } from "@/api/client";
import useLoadingState from "@/composables/useLoadingState";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import cloneDeep from "lodash.clonedeep";
import { computed, onMounted, ref } from "vue";
import { SalesVisit } from "@server/models/salesVisit.model";

interface TaskEditDialogProps {
  task: Task;
  users: User[];
  salesVisits: SalesVisit[];
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

const [loadingDelete, deleteTask] = useLoadingState(async () => {
  if (!internalTask.value) {
    return;
  }

  await client.task.deleteTask.mutate(internalTask.value);

  emit("accept");
});
</script>

<template>
  <br-dialog
    :label="isCreating ? 'Add new task' : 'Edit Task'"
    :confirm-text="isCreating ? 'Add' : 'Save'"
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
      <v-col cols="12" class="py-0">
        <br-dropdown
          v-model="internalTask.assignedSalesVisitId"
          :items="salesVisits"
          :disabled="salesVisits.length === 1"
          :item-title="(item: SalesVisit) => item.reference"
          :item-value="(item: SalesVisit) => item.id"
          label="Associate with visit"
          clearable
        />
      </v-col>
      <v-col v-if="internalTask.assignedSalesVisitId" cols="12" class="py-0">
        <br-btn
          class="px-0"
          variant="text"
          color="primary"
          @click="
            $router.push({
              path: `/sales/visits/${internalTask.assignedSalesVisitId}`,
            })
          "
        >
          Open Visit
        </br-btn>
      </v-col>
      <v-col cols="12">
        <br-checkbox v-model="internalTask.completed" label="Completed?" />
      </v-col>
    </v-row>
    <template v-if="!isCreating" #additional-buttons>
      <br-btn
        variant="text"
        color="red"
        :loading="loadingDelete"
        @click="deleteTask"
      >
        Delete
      </br-btn>
    </template>
  </br-dialog>
</template>
