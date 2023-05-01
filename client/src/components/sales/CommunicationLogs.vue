<script setup lang="ts">
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";
import { formateDateTime } from "@/utils/formattingUtils";

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
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              Author:
              {{ users.find((user) => user.id === log.authorId)?.name ?? "-" }}
            </v-col>
            <v-col cols="12">
              Time: {{ formateDateTime(log.createdDate) }}
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="pt-2">
            <v-col cols="12">
              {{ log.description }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
