import { client } from "@/api/client";
import cookieService from "@/services/cookieService";
import { User } from "@server/models/user.model";
import { defineStore } from "pinia";
import { computed, reactive, toRefs } from "vue";

interface UserStoreState {
  user: User | null;
  sessionToken: string | null;
  tenantId: string | null;
}

export const useUserStore = defineStore("userStore", () => {
  const state = reactive<UserStoreState>({
    user: null,
    sessionToken: null,
    tenantId: null,
  });

  const clearState = () => {
    state.user = null;
    state.sessionToken = null;
    state.tenantId = null;
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
  };

  const isUserSignedIn = computed(() => {
    return !!state.user;
  });

  const isTenantSelected = computed(() => {
    return !!state.tenantId;
  });

  return {
    load,
    ...toRefs(state),
    clearState,
    isUserSignedIn,
    isTenantSelected,
  };
});
