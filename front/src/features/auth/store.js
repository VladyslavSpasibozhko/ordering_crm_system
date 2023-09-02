import { createStore, useStore } from 'src/lib/store';

const initial = {
  email: null,
  loggedIn: false,
  // loading
  confirming: false,
  loginIng: false,
  // errors
  loginError: null,
  confirmError: null,
};

export const authStore = createStore(initial);
export const authActions = {
  setLoggedIn: (loggedIn) => {
    authStore.update((state) => ({ ...state, loggedIn }));
  },
  setEmail: (email) => {
    authStore.update((state) => ({ ...state, email }));
  },
  setConfirming(confirming, confirmError = null) {
    authStore.update((state) => ({ ...state, confirming, confirmError }));
  },
  setLoginIng(loginIng, loginError = null) {
    authStore.update((state) => ({ ...state, loginIng, loginError }));
  },
};

export const useAuthStore = () => {
  const { state } = useStore(authStore);

  return {
    state,
    actions: authActions,
  };
};
