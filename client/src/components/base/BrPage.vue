<script setup lang="ts">
interface BrPageProps {
  title: string;
  loading?: boolean;
  showBackButton?: boolean;
}

defineProps<BrPageProps>();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col v-if="showBackButton" cols="12" class="ma-0 pa-0">
            <br-btn variant="plain" color="primary" @click="$router.back">
              &lt; Go Back
            </br-btn>
          </v-col>
          <v-col cols="auto">
            <v-progress-circular v-if="loading" indeterminate />
            <h4 v-else class="text-h4">{{ title }}</h4>
          </v-col>
          <v-spacer />
          <v-col v-if="$slots['summary']" cols="auto">
            <slot name="summary" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row style="height: 100%">
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
    <portal to="footer" v-if="$slots['footer']">
      <slot name="footer" />
    </portal>
  </v-container>
</template>
