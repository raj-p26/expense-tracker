<script lang="ts">
  import { onMount } from "svelte";
  let token: string | null;

  onMount(() => {
    token = localStorage.getItem("userToken");

    if (!token) location.href = "/login";
  });
</script>

<nav>
  <div class="brand">PennyWise</div>

  <button class="mid-screen-nav-btn"> </button>
  <div class="nav-links">
    <ul>
      <li><a href="/">Overview</a></li>
      <li><a href="/">Incomes</a></li>
      <li><a href="/">Expenses</a></li>
      {#if token}
        <li><a href="/">Logout</a></li>
      {:else}
        <li><a href="/login">Login/Signup</a></li>
      {/if}
    </ul>
  </div>
</nav>

{#if !token}
  <div class="err">
    <h1>How are you even here?</h1>
  </div>
{:else}
  <section style:margin-top="3.5rem">
    <slot />
  </section>
{/if}

<style>
  nav {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .nav-links > ul {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  .err {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
