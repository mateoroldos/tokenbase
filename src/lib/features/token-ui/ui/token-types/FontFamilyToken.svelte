<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	export let token: IToken<'fontFamily'>

	function addInput() {
		token.value = [...token.value, '']
	}

	function removeInput(index: number) {
		token.value.splice(index, 1)
		token.value = [...token.value]
	}
</script>

<div class="flex flex-col gap-4">
	{#each token.value as value, i}
		<div class="flex">
			<input
				class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
				type="text"
				bind:value
			/>

			<button class="ml-2 self-center" on:click={() => removeInput(i)}>X</button
			>
		</div>
	{/each}

	<button class="mr-2" on:click={addInput}>+</button>
</div>
