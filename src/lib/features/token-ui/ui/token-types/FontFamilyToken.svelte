<script lang="ts">
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'

	export let token: Token<'fontFamily'>

	let inputs = [{ id: 1, value: '' }] // initial input

	function addInput() {
		const id = inputs[inputs.length - 1].id + 1
		inputs = [...inputs, { id, value: '' }]
	}

	function removeInput(id: number) {
		inputs = inputs.filter((input) => input.id !== id)
	}

	function handleInput(id: number, event) {
		inputs = inputs.map((input) => {
			if (input.id === id) {
				return { ...input, value: event.target.value }
			}
			return input
		})
	}

	$: token.value = inputs.map((input) => input.value)
</script>

<div class="flex flex-col gap-4">
	{#each inputs as input, i}
		<div class="flex">
			<input
				class="mr-2 w-52 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
				type="text"
				value={input.value}
				on:input={(event) => handleInput(input.id, event)}
			/>
			{#if i === inputs.length - 1}
				<button class="mr-2" on:click={addInput}>+</button>
			{/if}
			{#if inputs.length > 1}
				<button
					class="mr-2"
					on:click={() => removeInput(input.id)}>X</button
				>
			{/if}
		</div>
	{/each}
</div>

<div>
	<span style={`font-family: ${token.value}`}
		>Hello, how are you?</span
	>
</div>
