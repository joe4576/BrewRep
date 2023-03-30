import { User } from "@server/models/user.model";
import { defineStore } from "pinia";
import { computed, reactive, toRefs } from "vue";
import cookieService from "@/services/cookieService";
import { client } from "@/api/client";

interface UserStoreState {
  user: User | null;
  sessionToken: string | null;
  tenantGroupId: string | null;
  tenantId: string | null;
}

export const useUserStore = defineStore("userStore", () => {
  const state = reactive<UserStoreState>({
    user: null,
    sessionToken: null,
    tenantGroupId: null,
    tenantId: null,
  });

  const clearState = () => {
    state.user = null;
    state.sessionToken = null;
    state.tenantGroupId = null;
    state.tenantId = null;
  };

  /**
   * Load initial user state
   */
  const load = async () => {
    clearState();

    const sessionToken = cookieService.getCookie("br-session");
    const tenantGroupId = cookieService.getCookie("tenantgroupid");
    const tenantId = cookieService.getCookie("tenantid");

    if (!sessionToken) {
      return;
    }

    state.sessionToken = sessionToken;
    state.tenantGroupId = tenantGroupId ?? null;
    state.tenantId = tenantId ?? null;

    try {
      state.user = await client.user.getCurrentUser.query();
    } catch (e) {
      cookieService.removeCookie("br-session");
      cookieService.removeCookie("tenantgroupid");
      cookieService.removeCookie("tenantid");

      throw new Error("Failed to get current user", {
        cause: e,
      });
    }
  };

  const isUserSignedIn = computed(() => {
    return !!state.user;
  });

  const isTenantSelected = computed(() => {
    return state.tenantGroupId && state.tenantId;
  });

  return {
    load,
    ...toRefs(state),
    clearState,
    isUserSignedIn,
    isTenantSelected,
  };
});
