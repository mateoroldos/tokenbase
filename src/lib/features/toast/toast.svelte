<script lang="ts">
    import { X , AlertTriangle, CheckCircle2 } from 'lucide-svelte';
    import * as  Card  from "$lib/components/ui/card"

    export let type: string; // 'error', 'info', 'success'
    export let message: string;

    let showToast = true;
    
    function closeToast() {
      showToast = false;
    }
  </script>
  
{#if showToast}
    <Card.Root class="w-[380px]">
        <Card.Content>
            <div class="justify-end">
                <X on:click={closeToast}></X>
            </div>
            <div class="flex">
                {#if type === "error"}
                    <AlertTriangle color="red"/>
                {:else if type === "pending"}
                    <AlertTriangle color = "blue"/>
                {:else if type === "warning"}
                    <AlertTriangle color="orange"/>
                {:else if type === "Success"}
                    <CheckCircle2 color="green"/>
                {/if}
                <p>{type}</p>
            </div>
            <div>
                <p>{message}</p>
            </div>
            <div>
                <button on:click={closeToast}>Cerrar</button>
            </div>
        </Card.Content>
    </Card.Root>
{/if}