<script lang="ts">
	import Range from '$lib/components/Range.svelte'
	import { Hct } from '@material/material-color-utilities'
	import Color from 'color'
	import {
		generateChromaBackgroundGradient,
		generateHueBackgroundGradient,
		generateToneBackgroundGradient
	} from './utils/generateHctBackgroundGradients'
	import { createEventDispatcher } from 'svelte'
	import { Input } from '$lib/components/ui/input'
	import type { ColorTokenValue } from '$lib/features/token-management/color/types/internal-color-value.type'

	export let tokenValue: ColorTokenValue
	export let tokenId: string
	export let isAlias: boolean
	export let viewMode = false

	const dispatch = createEventDispatcher()

	let hexInput: HTMLInputElement

	let hue = tokenValue[0] ? [tokenValue[0]] : [0];
	let chroma = tokenValue[1] ? [tokenValue[1]] : [0];
	let tone = tokenValue[2] ? [tokenValue[2]] : [0];

	$: argb = Hct.from(hue[0], chroma[0], tone[0]).argb
	$: hex = Color(argb).hex()

	const handleHexChange = (e: Event) => {
		if (isAlias) return
		const target = e.target as HTMLInputElement
		const value = target.value

		if (value !== hex) {
			try {
				const newArgbColor = Color(value).rgbNumber()
				const hct = Hct.fromInt(newArgbColor)

				tokenValue = [hct.hue, hct.chroma, hct.tone]
				hex = target.value
			} catch (error) {
				hexInput.value = hex
			}
		}
	}

	$: hueBackground = generateHueBackgroundGradient(chroma[0], tone[0])

	$: chromaBackground = generateChromaBackgroundGradient(
		hue[0],
		tone[0]
	)

	$: toneBackground = generateToneBackgroundGradient(
		hue[0],
		chroma[0]
	)
</script>

<div class="flex flex-1 flex-row items-center gap-10">
	<div class="flex flex-row items-center gap-1">
		<div
			class="aspect-square h-7 rounded-sm border border-slate-300"
			style={`background-color: ${hex}`}
		/>
		<Input
			disabled={viewMode}
			value={hex}
			name="color"
			class="disabled:opacity-1 ml-1 h-7 w-20 border-none px-1 py-1 text-sm"
			type="text"
			{...isAlias ? { disabled: true } : {}}
			on:focusout={handleHexChange}
			bind:this={hexInput}
		/>
	</div>
	<div class="flex flex-1 flex-row items-center gap-10">
		<div class="flex w-full max-w-[130px] flex-col gap-1">
			<div class="flex flex-row items-center">
				<span class="text-xs text-slate-500">Hue</span>
				<input
					disabled={viewMode}
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={hue[0]}
				/>
			</div>
			<Range
				disabled={viewMode}
				min={0}
				max={360}
				id={`${tokenId}-hue-range`}
				background={hueBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={hue[0]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 0,
						value: e.detail.diff
					})}
			/>
		</div>
		<div class="flex w-full max-w-[130px] flex-col gap-1">
			<div class="flex flex-row items-center">
				<span class="text-xs text-slate-500">Chroma</span>
				<input
					disabled={viewMode}
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={chroma[0]}
				/>
			</div>
			<Range
				disabled={viewMode}
				min={0}
				max={100}
				id={`${tokenId}-chroma-range`}
				background={chromaBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={chroma[0]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 1,
						value: e.detail.diff
					})}
			/>
		</div>
		<div class="flex w-full max-w-[130px] flex-col gap-1">
			<div class="flex flex-row items-center">
				<span class="text-xs text-slate-500">Tone</span>
				<input
					disabled={viewMode}
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={tone[0]}
				/>
			</div>
			<Range
				disabled={viewMode}
				min={0}
				max={100}
				id={`${tokenId}-tone-range`}
				background={toneBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={tone[0]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 2,
						value: e.detail.diff
					})}
			/>
		</div>
	</div>
</div>
