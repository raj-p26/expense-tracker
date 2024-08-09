import { writable } from "svelte/store";

const store = writable("light");

const themeStore = {
  subscribe: store.subscribe,
  update: (themeType: "light" | "dark") => {
    store.update((currentTheme) => (currentTheme = themeType));
  },
};

export default themeStore;
