<script lang="ts">
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import durationSuite from '$lib/features/token-management/duration/durationSuite'

	export let token: IToken<'duration'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = durationSuite(target.value, name)
	}

	let res = durationSuite.get()
</script>

<div>
	<InputWrapper
		name="duration"
		errors={res.getErrors('duration')}
		isValid={res.isValid('duration')}
	>
		<div class="flex flex-row gap-2">
			<input
				name="duration"
				class="w-20 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
				type="number"
				{...isAlias ? { disabled: true } : {}}
				on:input={handleChange}
				bind:value={token.value}
			/>
			<span
				class=" flex items-center
			 text-sm">ms</span
			>
		</div>
	</InputWrapper>
</div>
