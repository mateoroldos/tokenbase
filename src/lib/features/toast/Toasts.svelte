<script lang="ts">
	import { fade } from 'svelte/transition'
    import Toast from './Toast.svelte'
    import { toasts, dismissToast } from "./stores/toastStore";
</script>



{#if $toasts}
  <section class="fixed bottom-4 right-4 flex mt-4 justify-center flex-col z-50 gap-y-2" transition:fade>
    {#each $toasts as toast (toast.id)}
      <Toast 
        type={toast.type}
        message = {toast.message}
        date={toast.date}
        color={toast.color}
        on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
      >
    {/each}
  </section>
{/if}