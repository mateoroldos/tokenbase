<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte'

	let inputElement: HTMLInputElement
	const dispatch = createEventDispatcher()

	afterUpdate(() => {
		if (inputElement) {
			inputElement.addEventListener('input', handleChange)
		}
	})

	function handleChange(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value
		dispatch('input', inputValue)
	}

	export let name: string
	export let errors: string[] = []
	export let isValid: boolean = true
</script>

<div class="input-wrapper">
	<!-- <label for={name}>{label}</label> -->
	{#if errors && errors.length > 0}
		{#each errors as error}
			<span class="error-list">{error}</span>
		{/each}
	{/if}
	{#if isValid}
		<div class="valid-indicator">✓</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	.input-wrapper {
		span {
			font-size: smaller;
			float: right;
		}
	}

	.error-list {
		color: red;
		margin-top: 0.5rem;
	}
	.valid-indicator {
		color: green;
		margin-top: 0.5rem;
		font-weight: 400;
		float: right;
	}
</style>
