<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import { onMount } from "svelte";

  export let data;

  onMount(() => {
    if (!data.token) location.href = "/login";
  });
</script>

<svelte:head>
  <title>PennyWise | Dashboard</title>
</svelte:head>

<Navbar token={data.token} />

{#if !data.token}
  <div class="err">
    <h1>How are you even here?</h1>
  </div>
{:else}
  <section style:margin-top="3.5rem">
    <slot />
  </section>
{/if}

<style>
  .err {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
