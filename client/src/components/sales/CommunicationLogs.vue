<script setup lang="ts">
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";

interface CommunicationLogsInterface {
  communicationLogs: CommunicationLog[];
  users: User[];
}

defineProps<CommunicationLogsInterface>();
</script>

<template>
  <v-timeline side="end">
    <v-timeline-item v-for="log in communicationLogs" :key="log.id">
      <v-card>
        <v-card-subtitle>
          Author:
          {{ users.find((user) => user.id === log.authorId)?.name ?? "-" }}
        </v-card-subtitle>
        <v-card-text>
          {{ log.description }}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
