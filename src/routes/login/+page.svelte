<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { goto } from "$app/navigation";

  export let data;

  if (data.token) goto("/");

  $: openModal = false;
</script>

<svelte:head>
  <title>Log In | PennyWise</title>
</svelte:head>

<div class="container">
  <div class="content">
    <h1 style:font-size="3rem" style:color="var(--primary)">PennyWise</h1>
    <p style:font-size="1.5rem" style:margin-top="1rem">
      PennyWise is an expense tracker web app that helps you manage your finance
      effieciently.
    </p>
  </div>
  <div class="login-form">
    <form method="post" action="?/login">
      <Input name="email" inputType="email" />
      <Input inputType="password" name="password" />
      <Button fullWidth>Login</Button>
    </form>
    <div class="hr" />
    <Button class_="secondary" fullWidth on:click={() => (openModal = true)}>
      Signup
    </Button>
  </div>
</div>

{#if openModal}
  <Modal on:close={() => (openModal = false)}>
    <div slot="head">
      <h1 style:font-weight="normal">Register</h1>
      <p style:font-weight="lighter">Its quick and easy</p>
    </div>

    <form method="post" action="?/register">
      <Input name="username" />
      <Input name="email" inputType="email" />
      <Input name="password" inputType="password" />
      <Button fullWidth>Sign Up</Button>
    </form>
  </Modal>
{/if}

<style>
  .container {
    height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .content {
    width: 30%;
  }

  .login-form {
    box-shadow: 2px 2px 50px rgba(0, 0, 0, 0.26);
    width: 30%;
    padding: 1rem;
    border-radius: 8px;
  }

  .hr {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    margin: 2rem 0;
  }

  @media screen and (width <= 900px) {
    .container {
      display: flex;
      flex-direction: column;
    }

    .content {
      width: 80%;
      max-width: 600px;
    }

    .login-form {
      width: 80%;
      max-width: 400px;
    }
  }
</style>
