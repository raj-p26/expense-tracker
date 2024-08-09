<script lang="ts">
  export let token: string | undefined;
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
        <li>
          <form action="/logout" method="post">
            <input type="submit" name="logout" value="logout" />
          </form>
        </li>
      {:else}
        <li><a href="/login">Login/Signup</a></li>
      {/if}
    </ul>
  </div>
</nav>

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
</style>
