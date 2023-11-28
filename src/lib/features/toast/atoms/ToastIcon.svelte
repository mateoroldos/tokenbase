<script lang="ts">
    import type { ToastType } from "../types/toast.interface"; 
    import { AlertTriangle, CheckCircle2 , Info } from 'lucide-svelte';

    export let type: ToastType;
</script>

<div class="flex items-start pt-5 pr-4 pl-6">
    {#if type === "error"}
        <AlertTriangle color="red"/>
    {:else if type === "info"}
        <Info  color="blue"/>
    {:else if type === "warning"}
        <AlertTriangle color="orange"/>
    {:else if type === "success"}
        <CheckCircle2 color="green"/>
    {/if}
    <p class="pl-4 capitalize font-bold">{type}</p>
</div>