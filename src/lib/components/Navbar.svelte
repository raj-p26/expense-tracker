<script lang="ts">
  export let token: string | undefined;

  $: openMenu = false;
</script>

<nav>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="navbar-backdrop"
    class:active={openMenu}
    on:click={() => (openMenu = false)}
  />
  <div class="brand" style:color="var(--on-primary)">PennyWise</div>

  <button class="open-menu-btn" on:click={() => (openMenu = true)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      height="24"
      width="24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
  <div class="nav-links" class:active={openMenu}>
    <div>
      <button class="close-menu-btn" on:click={() => (openMenu = false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
          height="24"
          width="24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul>
        <li><a href="/">Overview</a></li>
        <li><a href="/">Incomes</a></li>
        <li><a href="/">Expenses</a></li>
        {#if token}
          <li>
            <form action="/logout" method="post">
              <input type="submit" name="logout" value="Logout" />
            </form>
          </li>
        {:else}
          <li><a href="/login">Login/Signup</a></li>
        {/if}
      </ul>
    </div>
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
    background-color: var(--primary);
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.26);
  }

  .navbar-backdrop,
  .open-menu-btn,
  .close-menu-btn {
    display: none;
  }

  .nav-links ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  input[type="submit"] {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    color: var(--on-primary);
    font-size: 1.1rem;
  }

  a {
    color: var(--on-primary);
    text-decoration: none;
  }

  @media screen and (width <= 800px) {
    .open-menu-btn {
      display: block;
      cursor: pointer;
      background-color: transparent;
      outline: none;
      border: none;
    }

    .open-menu-btn > svg {
      stroke: var(--on-primary);
    }

    .close-menu-btn {
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 1rem;
      margin-right: 1rem;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
    }

    .close-menu-btn > svg {
      stroke: var(--on-primary-container);
    }

    .nav-links {
      position: fixed;
      top: 0;
      bottom: 0;
      right: -50%;
      width: 50%;
      height: 100vh;
      background-color: var(--primary-container);
      box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.26);
      transition: 0.2s ease;
    }

    .nav-links.active {
      right: 0;
    }

    .nav-links > div {
      height: 100vh;
      position: relative;
      padding-top: 4rem;
    }

    .nav-links ul {
      display: flex;
      flex-direction: column;
    }

    .nav-links > ul li {
      display: block;
    }

    .navbar-backdrop.active {
      position: fixed;
      display: block;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.26);
      transition: 0.3s ease;
    }

    a,
    input[type="submit"] {
      color: var(--on-primary-container);
    }
  }
</style>
