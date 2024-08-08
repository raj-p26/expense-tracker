<script lang="ts">
  export let class_: string = "primary";
  export let fullWidth = false;
</script>

<button class={class_} class:full-width={fullWidth} on:click>
  <slot>Button</slot>
</button>

<style>
  button {
    cursor: pointer;
    padding: 0.5rem 1.2rem;
    outline: none;
    border: none;
    border-radius: 8px;
    text-align: center;
    font-size: 1rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
    transition: 0.1s ease;
  }

  button.full-width {
    display: block;
    width: 100%;
  }

  button.danger {
    background-color: #d32f2f;
    color: #fff;
  }

  button.danger:hover {
    background-color: #c62828;
  }

  button.primary {
    background-color: var(--primary);
    color: var(--on-primary);
  }

  button.primary:hover {
    opacity: 0.9;
  }

  button.secondary {
    background-color: #616161;
    color: #fff;
  }

  button.secondary:hover {
    background-color: #424242;
  }
</style>
