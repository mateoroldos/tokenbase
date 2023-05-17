<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'font-family'>

	let defaultInputValue = token.value[0] || ''

	function addInput() {
		token.value = [...token.value, defaultInputValue]
	}

	function removeInput(index: number) {
		token.value = token.value.filter((_, i) => i !== index)
	}
</script>

<div class="flex flex-col gap-4">
	{#each token.value as value, i}
		<div class="flex">
			<input
				class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
				type="text"
				bind:value={token.value[i]}
			/>
			{#if i === token.value.length - 1}
				<button class="mr-2" on:click={addInput}>+</button>
			{/if}
			{#if token.value.length > 1}
				<button class="mr-2" on:click={() => removeInput(i)}>X</button>
			{/if}
		</div>
	{/each}
</div>
