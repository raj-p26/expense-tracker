<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import themeStore from "$lib/stores/ThemeStore";

  export let token: string | undefined;
  let themeMode: string | undefined;

  let unsubscribe = themeStore.subscribe((mode) => (themeMode = mode));

  $: isDark = themeMode == "dark";

  const toggleTheme = () => {
    themeStore.update(isDark ? "light" : "dark");
  };

  onMount(() => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key == "Escape" && openMenu) openMenu = false;
    });
  });

  onDestroy(unsubscribe);

  $: openMenu = false;
</script>

<nav class:dark={isDark}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="navbar-backdrop"
    class:active={openMenu}
    on:click={() => (openMenu = false)}
  />
  <div class="brand" class:dark={isDark}>PennyWise</div>

  <button
    class="open-menu-btn"
    class:dark={isDark}
    on:click={() => (openMenu = true)}
  >
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
  <div class="nav-links" class:active={openMenu} class:dark={isDark}>
    <div class:dark={isDark}>
      <button
        class="close-menu-btn"
        class:dark={isDark}
        on:click={() => (openMenu = false)}
      >
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
        <li>
          <a class:dark={isDark} href="/">Overview</a>
        </li>
        <li>
          <a class:dark={isDark} href="/">Incomes</a>
        </li>
        <li>
          <a class:dark={isDark} href="/">Expenses</a>
        </li>
        {#if token}
          <li>
            <form action="/logout" method="post">
              <input
                type="submit"
                class:dark={isDark}
                name="logout"
                value="Logout"
              />
            </form>
          </li>
        {:else}
          <li><a href="/login">Login/Signup</a></li>
        {/if}
        <button
          on:click={toggleTheme}
          class:dark={isDark}
          class="theme-toggler"
        >
          {#if isDark}
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          {:else}
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
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          {/if}
        </button>
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

  nav.dark {
    background-color: var(--primary-dark);
  }

  .brand {
    color: var(--on-primary);
  }

  .brand.dark {
    color: var(--on-primary-dark);
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

  a.dark,
  input[type="submit"].dark {
    color: var(--on-primary-dark);
  }

  a:hover,
  input[type="submit"]:hover {
    text-decoration: underline;
  }

  .theme-toggler {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .theme-toggler > svg {
    stroke: var(--on-primary);
  }

  .theme-toggler.dark > svg {
    stroke: var(--on-primary-dark);
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

    .open-menu-btn.dark > svg {
      stroke: var(--on-primary-dark);
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

    .close-menu-btn.dark > svg {
      stroke: var(--on-primary-container-dark);
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

    .nav-links.dark {
      background-color: var(--primary-container-dark);
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

    .theme-toggler {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 1rem;
      margin-left: 1rem;
    }

    .theme-toggler > svg {
      stroke: var(--on-primary-container);
    }

    .theme-toggler.dark > svg {
      stroke: var(--on-primary-container-dark);
    }
    a,
    input[type="submit"] {
      color: var(--on-primary-container);
    }

    a.dark,
    input[type="submit"].dark {
      color: var(--on-primary-container-dark);
    }
  }
</style>
