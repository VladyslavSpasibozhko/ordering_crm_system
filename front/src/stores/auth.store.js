import { create } from 'zustand';

const initial = {
  email: null,
  loggedIn: false,
  user: null,
};

export const useAuthStore = create((set) => ({
  ...initial,
  setEmail: (email) => set((state) => ({ ...state, email })),
  setLoggedIn: (loggedIn) => set((state) => ({ ...state, loggedIn })),
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export const subscribeAuth = useAuthStore.subscribe;

export const getAuthStore = () => useAuthStore.getState();
