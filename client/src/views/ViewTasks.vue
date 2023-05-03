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
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import BrGrid from "@/components/grid/BrGrid.vue";
import BrPage from "@/components/base/BrPage.vue";
import { SalesVisit } from "@server/models/salesVisit.model";

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);
const salesVisits = ref<SalesVisit[]>([]);
const showTaskEditDialog = ref(false);
const taskToEdit = ref<Task>();
const isCreatingTask = ref(false);

const userStore = useUserStore();

const [loading, refresh] = useLoadingState(async () => {
  [tasks.value, users.value, salesVisits.value] = await Promise.all([
    client.task.getAllTasks.query(),
    client.user.getAllUsers.query(),
    client.salesVisit.getAllSalesVisits.query(),
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
    completed: false,
  };

  taskToEdit.value = task ?? newTask;

  showTaskEditDialog.value = true;
};

const gridConfiguration = new GridConfigurationBuilder<Task>()
  .addTextColumn("Description", (item) => item.description)
  .addTextColumn("Created by", (item) =>
    item.createdByUserId
      ? users.value.find((user) => user.id === item.createdByUserId)?.name ??
        "-"
      : "-"
  )
  .addTextColumn("Assigned to", (item) =>
    item.assignedToUserId
      ? users.value.find((user) => user.id === item.assignedToUserId)?.name ??
        "-"
      : "-"
  )
  .addTextColumn("Journey Reference", (item) =>
    item.assignedSalesVisitId
      ? salesVisits.value.find(
          (visit) => visit.id === item.assignedSalesVisitId
        )?.reference ?? "-"
      : "-"
  )
  .addDateColumn("Due date", (item) => item.dateDue)
  .addBooleanColumn("Completed?", (item) => item.completed)
  .addActionsColumn((builder) => {
    builder.addClickAction("Edit", openTaskEditDialog).addClickAction(
      "Mark as Complete",
      async (item) => {
        await client.task.saveTask.mutate({
          ...item,
          completed: true,
        });

        await refresh();
      },
      {
        visible: (item) => !item.completed,
      }
    );
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page title="Tasks">
    <br-grid
      :grid-configuration="gridConfiguration"
      :items="tasks"
      :loading="loading"
      @row-clicked="openTaskEditDialog"
    />
  </br-page>

  <portal to="footer">
    <button-bar>
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
    :sales-visits="salesVisits"
    :is-creating="isCreatingTask"
    @accept="
      showTaskEditDialog = false;
      refresh();
    "
  />
</template>
