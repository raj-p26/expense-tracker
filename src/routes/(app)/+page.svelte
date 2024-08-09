<script lang="ts">
  import { onDestroy } from "svelte";
  import themeStore from "$lib/stores/ThemeStore";

  let themeMode: string | undefined;
  let unsubscribe = themeStore.subscribe((mode) => (themeMode = mode));

  onDestroy(unsubscribe);
</script>

<div class:dark={themeMode == "dark"}>
  <h1>Expense Tracker</h1>
</div>

<style>
  div {
    height: 100vh;
    background-color: var(--surface);
  }

  div.dark {
    background-color: var(--surface-dark);
  }
</style>
