import { User } from "@server/models/user.model";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import cookieService from "@/services/cookieService";
import { client } from "@/api/client";

interface UserStoreState {
  user: User | null;
  sessionToken: string | null;
}

export const useUserStore = defineStore("userStore", () => {
  const state = reactive<UserStoreState>({
    user: null,
    sessionToken: null,
  });

  const clearState = () => {
    state.user = null;
    state.sessionToken = null;
  };

  /**
   * Load initial user state
   */
  const load = async () => {
    clearState();

    const sessionToken = cookieService.getCookie("br-session");

    if (!sessionToken) {
      return;
    }

    state.sessionToken = sessionToken;

    try {
      state.user = await client.user.getCurrentUser.query();
    } catch (e) {
      throw new Error("Failed to get current user", {
        cause: e,
      });
    }
  };

  return {
    load,
    ...toRefs(state),
    clearState,
  };
});
