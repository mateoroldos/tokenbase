<script lang="ts">
	import { activeThemeIndex } from '$lib/features/themes/activeThemeIndexStore'
	import { Input } from '$lib/components/ui/input'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import durationSuite from '$lib/features/token-management/duration/durationSuite'

	export let token: IToken<'duration'>

	$: isAlias = token.alias !== undefined

	$: activeThemeTokenValue = token.value[$activeThemeIndex]

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = durationSuite(target.value, name)
	}

	let res = durationSuite.get()
</script>

<div>
	<div class="flex flex-row gap-2">
		<Input
			name="duration"
			class="h-8 w-[80px] "
			type="number"
			{...isAlias ? { disabled: true } : {}}
			on:input={handleChange}
			bind:value={activeThemeTokenValue}
		/>
		<span
			class=" flex items-center
			 text-sm">ms</span
		>
	</div>
</div>
