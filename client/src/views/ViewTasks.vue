<script setup lang="ts">
import { client } from "@/api/client";
import ButtonBar from "@/components/ButtonBar.vue";
import TaskEditDialog from "@/components/tasks/TaskEditDialog.vue";
import useLoadingState from "@/composables/useLoadingState";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import { onMounted, ref } from "vue";
import { v4 as uuid } from "uuid";
import { useUserStore } from "@/store/userStore";

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);
const showTaskEditDialog = ref(false);
const taskToEdit = ref<Task>();
const isCreatingTask = ref(false);

const userStore = useUserStore();

const [loading, refresh] = useLoadingState(async () => {
  [tasks.value, users.value] = await Promise.all([
    client.task.getAllTasks.query(),
    client.user.getAllUsers.query(),
  ]);
});

const openTaskEditDialog = (task?: Task) => {
  if (!userStore.user?.id || !userStore.tenantId) {
    return;
  }

  isCreatingTask.value = !task;

  const newTask: Task = {
    id: uuid(),
    dateCreated: new Date(),
    dateDue: new Date(),
    createdByUserId: userStore.user.id,
    description: "",
    tenantId: userStore.tenantId,
  };

  taskToEdit.value = task ?? newTask;

  showTaskEditDialog.value = true;
};

onMounted(refresh);
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h4 class="text-h4">View Tasks</h4>
          </v-col>
        </v-row>
        <v-skeleton-loader v-if="loading" type="table-tbody" />
        <v-row v-else>
          <v-col cols="12">
            <v-list>
              <template v-for="task in tasks" :key="task.id">
                <v-list-item link @click="openTaskEditDialog(task)">
                  <v-list-item-title>
                    {{
                      users.find((user) => user.id === task.createdByUserId)
                        ?.name ?? "User not found"
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ task.description }}
                  </v-list-item-subtitle>
                  <template #prepend>
                    <v-icon>mdi-home</v-icon>
                  </template>
                </v-list-item>
                <v-divider />
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <portal to="footer">
    <button-bar>
      <template #left>
        <br-btn>cancel</br-btn>
      </template>
      <template #right>
        <br-btn color="primary" @click="openTaskEditDialog()">
          Add Task
        </br-btn>
      </template>
    </button-bar>
  </portal>
  <task-edit-dialog
    v-model="showTaskEditDialog"
    v-if="showTaskEditDialog && taskToEdit"
    :task="taskToEdit"
    :users="users"
    :is-creating="isCreatingTask"
    @accept="
      showTaskEditDialog = false;
      refresh();
    "
  />
</template>
