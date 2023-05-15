<script lang="ts">
	import Range from '$lib/components/Range.svelte'
	import type { Token } from '$lib/features/token-groups-store/types/token-interface'
	import { Hct } from '@material/material-color-utilities'
	import Color from 'color'
	import {
		generateChromaBackgroundGradient,
		generateHueBackgroundGradient,
		generateToneBackgroundGradient
	} from './utils/generateHctBackgroundGradients'

	export let token: Token<'color'>

	let hexInput: HTMLInputElement

	$: argb = Hct.from(token.value[0], token.value[1], token.value[2]).argb
	$: hex = Color(argb).hex()

	const handleHexChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		const value = target.value

		if (value !== hex) {
			try {
				const newArgbColor = Color(value).rgbNumber()
				const hct = Hct.fromInt(newArgbColor)

				token.value = [hct.hue, hct.chroma, hct.tone]
				hex = target.value
			} catch (error) {
				hexInput.value = hex
			}
		}
	}

	$: hueBackground = generateHueBackgroundGradient(
		token.value[1],
		token.value[2]
	)

	$: chromaBackground = generateChromaBackgroundGradient(
		token.value[0],
		token.value[2]
	)

	$: toneBackground = generateToneBackgroundGradient(
		token.value[0],
		token.value[1]
	)
</script>

<div class="flex flex-1 flex-row items-center gap-4">
	<input
		value={hex}
		class="w-24 rounded-md border-2 border-solid border-gray-200 px-2 py-1"
		type="text"
		on:focusout={handleHexChange}
		bind:this={hexInput}
	/>
	<div
		class="h-6 min-w-[1.5rem] border border-gray-400"
		style={`background-color: ${hex}`}
	/>
	<div class="flex w-full flex-col gap-1">
		<div class="flex flex-row items-center gap-1">
			<span class="text-xs text-gray-500">Hue</span>
			<input
				type="number"
				bind:value={token.value[0]}
				class="w-14 rounded-md border border-gray-300 px-1 text-xs"
			/>
		</div>
		<Range
			min={0}
			max={360}
			bind:value={token.value[0]}
			id={`${token.id}-hue-range`}
			background={hueBackground}
		/>
	</div>
	<div class="flex w-full flex-col gap-1">
		<div class="flex flex-row items-center gap-1">
			<span class="text-xs text-gray-500">Chroma</span>
			<input
				type="number"
				bind:value={token.value[1]}
				class="w-14 rounded-md border border-gray-300 px-1 text-xs"
			/>
		</div>
		<Range
			min={0}
			max={100}
			bind:value={token.value[1]}
			id={`${token.id}-chroma-range`}
			background={chromaBackground}
		/>
	</div>
	<div class="flex w-full flex-col gap-1">
		<div class="flex flex-row items-center gap-1">
			<span class="text-xs text-gray-500">Tone</span>
			<input
				type="number"
				bind:value={token.value[2]}
				class="w-14 rounded-md border border-gray-300 px-1 text-xs"
			/>
		</div>
		<Range
			min={0}
			max={100}
			bind:value={token.value[2]}
			id={`${token.id}-saturation-range`}
			background={toneBackground}
		/>
	</div>
</div>
