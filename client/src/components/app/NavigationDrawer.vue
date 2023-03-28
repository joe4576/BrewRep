<script setup lang="ts">
import { computed } from "vue";

interface MenuItem {
  prependIcon?: string;
  title: string;
  to?: string;
  subMenuItems?: MenuItem[];
}

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();

const showDrawer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const menuItems: MenuItem[] = [
  {
    title: "Home",
    prependIcon: "mdi-home",
    to: "/",
  },
  {
    title: "Settings",
    prependIcon: "mdi-cog",
    subMenuItems: [
      {
        title: "Account",
        to: "/settings/account",
      },
    ],
  },
];
</script>

<template>
  <v-navigation-drawer v-model="showDrawer">
    <v-list density="compact" nav>
      <template v-for="item in menuItems" :key="item.title">
        <!-- Menu item without submenu -->
        <v-list-item
          v-if="!item.subMenuItems"
          class="rounded-e-xl"
          active-class="text-primary"
          :prepend-icon="item.prependIcon"
          :to="item.to"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <!-- Menu item with submenu -->
        <template v-else>
          <v-list-group>
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                class="rounded-e-xl"
                :prepend-icon="item.prependIcon"
                :to="item.to"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item
              v-for="subMenuItem in item.subMenuItems"
              :key="subMenuItem.title"
              class="rounded-e-xl"
              active-class="text-primary"
              :to="subMenuItem.to"
            >
              <v-list-item-title>{{ subMenuItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
