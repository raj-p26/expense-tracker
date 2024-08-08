<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Button from "./Button.svelte";

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key == "Escape") dispatchClose();
    });
  });

  onDestroy(() => {
    document.removeEventListener("keydown", () => {});
  });

  const dispatch = createEventDispatcher();

  const dispatchClose = () => {
    dispatch("close");
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="backdrop" transition:fade on:click={dispatchClose}></div>
<div class="modal" transition:fly={{ y: -50 }}>
  <div class="modal-head" style:margin-bottom="1rem">
    <div style:margin-bottom="1rem">
      <slot name="head">
        <h1>Title of Modal</h1>
      </slot>
    </div>
    <hr />
  </div>
  <div class="modal-body">
    <slot>
      <h1>Body of Modal</h1>
    </slot>
  </div>
  <div class="modal-footer">
    <hr />
    <div style:margin-top="1rem">
      <slot name="footer">
        <Button class_="secondary" on:click={dispatchClose}>Esc</Button>
      </slot>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .modal {
    width: 80%;
    max-width: 500px;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    border-radius: 10px;
    padding: 1rem 1rem 0 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
</style>
