<script lang="ts">
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'
	import { Input } from '$lib/components/ui/input'
	import durationSuite from '$lib/features/token-management/duration/durationSuite'
	import type { DurationTokenValue } from '$lib/features/token-management/duration/internal-duration.value.type'

	export let tokenValue: DurationTokenValue
	export let isAlias: boolean

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
			bind:value={tokenValue}
		/>
		<span
			class=" flex items-center
			 text-sm">ms</span
		>
	</div>
</div>
