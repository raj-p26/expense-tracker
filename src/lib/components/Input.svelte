<script lang="ts">
  export let inputType: string = "text";
  export let rows: number = 3;
  export let name: string;
  export let required = true;
  export let errorMessage = "";
  let displayName = name.charAt(0).toUpperCase() + name.substring(1);
</script>

<div style:margin-top="1rem" style:margin-bottom="1rem">
  {#if inputType === "textarea"}
    <textarea
      {rows}
      {name}
      id={name}
      {required}
      placeholder={displayName}
      autocomplete="off"
    />
  {:else}
    <input
      type={inputType}
      {name}
      id={name}
      {required}
      placeholder={displayName}
      autocomplete="off"
    />
  {/if}
  <span>{errorMessage}</span>
</div>

<style>
  input,
  textarea {
    outline: none;
    border: 2px solid var(--primary);
    border-radius: 4px;
    font-size: 1.2rem;
    padding: 0.5rem;
    width: 100%;
  }

  span {
    display: block;
    color: var(--error);
    font-size: small;
  }
</style>
