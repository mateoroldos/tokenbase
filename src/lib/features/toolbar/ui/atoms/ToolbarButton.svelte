<script lang="ts">
  import type { ComponentType } from 'svelte';
  import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$components/ui/tooltip'

  export let icon: ComponentType;
  export let action: () => void;
  export let name: string;
  export let active = true;
</script>


<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <div class="flex flex-row gap-2 items-center">
        <slot/>
        <button class="flex flex-col items-center" on:click={action} disabled={!active} class:text-gray-300={!active} class:text-gray-600={active}>
          <svelte:component this={icon} class="w-4"/>
        </button>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <span class="text-xs text-gray-700">{name}</span>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

