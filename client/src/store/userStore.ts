import { client } from "@/api/client";
import cookieService from "@/services/cookieService";
import { User } from "@server/models/user.model";
import { defineStore } from "pinia";
import { computed, reactive, toRefs } from "vue";
import { BrewmanLink } from "@server/models/brewmanLink.model";

interface UserStoreState {
  user: User | null;
  sessionToken: string | null;
  tenantId: string | null;
  brewmanLink: BrewmanLink | null;
}

export const useUserStore = defineStore("userStore", () => {
  const state = reactive<UserStoreState>({
    user: null,
    sessionToken: null,
    tenantId: null,
    brewmanLink: null,
  });

  const clearState = () => {
    state.user = null;
    state.sessionToken = null;
    state.tenantId = null;
    state.brewmanLink = null;
  };

  /**
   * Load initial user state
   */
  const load = async () => {
    clearState();

    const sessionToken = cookieService.getCookie("br-session");
    const tenantId = cookieService.getCookie("tenant-id");

    if (!sessionToken) {
      return;
    }

    state.sessionToken = sessionToken;
    state.tenantId = tenantId ?? null;

    try {
      state.user = await client.user.getCurrentUser.query();
    } catch (e) {
      cookieService.removeCookie("br-session");
      cookieService.removeCookie("tenant-id");

      throw new Error("Failed to get current user", {
        cause: e,
      });
    }

    // if we have a tenant id and a user, get brewman link
    if (state.tenantId) {
      state.brewmanLink = await client.brewmanLink.getBrewmanLink.query();
    }
  };

  const isUserSignedIn = computed(() => {
    return !!state.user;
  });

  const isTenantSelected = computed(() => {
    return !!state.tenantId;
  });

  const hasBrewManLink = computed(() => {
    return !!state.brewmanLink;
  });

  return {
    load,
    ...toRefs(state),
    clearState,
    isUserSignedIn,
    isTenantSelected,
    hasBrewManLink,
  };
});
