<script lang="ts">
    import type { ToastType } from "../types/toast.interface"; 
    import { X , AlertTriangle, CheckCircle2 , Info } from 'lucide-svelte';

    export let type: ToastType;
</script>

{#if type === "error"}
    <div class="bg-red-500 h-full w-2 rounded-tl-lg rounded-bl-lg"></div>
{:else if type === "info"}
    <div class="bg-blue-500 h-full w-2 rounded-tl-lg rounded-bl-lg"></div>
{:else if type === "warning"}
    <div class="bg-orange-500 h-full w-2 rounded-tl-lg rounded-bl-lg"></div>
{:else if type === "success"}
    <div class="bg-green-500 h-full w-2 rounded-tl-lg rounded-bl-lg"></div>
{/if}
