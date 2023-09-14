<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import cubicBezierSuite from '$lib/features/token-management/cubic-bezier/cubicBezierSuite'

	export let token: IToken<'cubicBezier'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		const target = input.target as HTMLInputElement
		const name = target.name

		res = cubicBezierSuite(target.value, name)
	}

	let res = cubicBezierSuite.get()
</script>

<div class="flex gap-x-3">
	<div class="flex flex-row gap-2">
		<input
			name="p1x"
			class="w-14 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			bind:value={token.value[0]}
			on:input={handleChange}
			min="0"
			max="1"
			id="p1x"
		/><span
			class=" flex items-center
		text-sm">p1x</span
		>
	</div>

	<div class="flex flex-row gap-2">
		<input
			id="p1y"
			name="p1y"
			class="w-14 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
			type="number"
			size="1"
			{...isAlias ? { disabled: true } : {}}
			on:input={handleChange}
			bind:value={token.value[1]}
		/><span
			class=" flex items-center
		text-sm">p1y</span
		>
	</div>

	<div class="flex flex-row gap-2">
		<input
			id="p2x"
			name="p2x"
			class="w-14 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			on:input={handleChange}
			bind:value={token.value[2]}
		/><span
			class=" flex items-center
		text-sm">p2x</span
		>
	</div>

	<div class="flex flex-row gap-2">
		<input
			id="p2y"
			name="p2y"
			class="w-14 rounded-md border-2 border-solid border-gray-200 px-2 py-1 text-sm"
			type="number"
			{...isAlias ? { disabled: true } : {}}
			on:input={handleChange}
			bind:value={token.value[3]}
			min="0"
			max="1"
		/><span
			class=" flex items-center
		text-sm">p2y</span
		>
	</div>
</div>
