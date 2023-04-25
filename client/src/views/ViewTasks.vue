<script setup lang="ts">
import { client } from "@/api/client";
import { Task } from "@server/models/task.model";
import { onMounted } from "vue";
import { ref } from "vue";
import ButtonBar from "@/components/ButtonBar.vue";
import { User } from "@server/models/user.model";

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);

onMounted(async () => {
  [tasks.value, users.value] = await Promise.all([
    client.task.getAllTasks.query(),
    client.user.getAllUsers.query(),
  ]);
});
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
        <v-row>
          <v-col cols="12">
            <v-list>
              <template v-for="task in tasks" :key="task.id">
                <v-list-item link>
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
  <teleport to="#app-footer">
    <button-bar>
      <template #left>
        <br-btn>cancel</br-btn>
      </template>
      <template #right>
        <br-btn color="primary">Add Task</br-btn>
      </template>
    </button-bar>
  </teleport>
</template>
