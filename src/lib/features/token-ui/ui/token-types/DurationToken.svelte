<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import durationSuite from '$lib/features/token-management/duration/durationSuite'
	import { Import } from 'lucide-svelte'
	import { viewMode } from '../../../viewMode/stores/viewMode';

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
	<div class="flex flex-row gap-2">
		<Input disabled={$viewMode}
			name="duration"
			class="h-8 w-[80px] disabled:opacity-1"
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
</div>
