<script lang="ts">
	import { activeThemeIndex } from '$lib/features/themes/activeThemeIndexStore'
	import Range from '$lib/components/Range.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { Hct } from '@material/material-color-utilities'
	import Color from 'color'
	import {
		generateChromaBackgroundGradient,
		generateHueBackgroundGradient,
		generateToneBackgroundGradient
	} from './utils/generateHctBackgroundGradients'
	import { createEventDispatcher } from 'svelte'
	import { Input } from '$lib/components/ui/input'

	export let token: IToken<'color'>

	$: isAlias = token.alias !== undefined

	$: activeThemeTokenValue = token.value[$activeThemeIndex]

	const dispatch = createEventDispatcher()

	let hexInput: HTMLInputElement

	$: argb = Hct.from(
		activeThemeTokenValue[0],
		activeThemeTokenValue[1],
		activeThemeTokenValue[2]
	).argb
	$: hex = Color(argb).hex()

	const handleHexChange = (e: Event) => {
		if (isAlias) return
		const target = e.target as HTMLInputElement
		const value = target.value

		if (value !== hex) {
			try {
				const newArgbColor = Color(value).rgbNumber()
				const hct = Hct.fromInt(newArgbColor)

				activeThemeTokenValue = [hct.hue, hct.chroma, hct.tone]
				hex = target.value
			} catch (error) {
				hexInput.value = hex
			}
		}
	}

	$: hueBackground = generateHueBackgroundGradient(
		activeThemeTokenValue[1],
		activeThemeTokenValue[2]
	)

	$: chromaBackground = generateChromaBackgroundGradient(
		activeThemeTokenValue[0],
		activeThemeTokenValue[2]
	)

	$: toneBackground = generateToneBackgroundGradient(
		activeThemeTokenValue[0],
		activeThemeTokenValue[1]
	)
</script>

<div class="flex flex-1 flex-row items-center gap-10">
	<div class="flex flex-row items-center gap-1">
		<div
			class="aspect-square h-7 rounded-sm border border-slate-300"
			style={`background-color: ${hex}`}
		/>
		<Input
			value={hex}
			name="color"
			class="ml-1 h-7 w-20 border-none px-1 py-1 text-sm"
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
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={activeThemeTokenValue[0]}
				/>
			</div>
			<Range
				min={0}
				max={360}
				id={`${token.id}-hue-range`}
				background={hueBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={activeThemeTokenValue[0]}
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
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={activeThemeTokenValue[1]}
				/>
			</div>
			<Range
				min={0}
				max={100}
				id={`${token.id}-chroma-range`}
				background={chromaBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={activeThemeTokenValue[1]}
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
					type="number"
					class="w-14 rounded-md bg-transparent px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={activeThemeTokenValue[2]}
				/>
			</div>
			<Range
				min={0}
				max={100}
				id={`${token.id}-saturation-range`}
				background={toneBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={activeThemeTokenValue[2]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 2,
						value: e.detail.diff
					})}
			/>
		</div>
	</div>
</div>
