<script lang="ts">
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
	import suite from '../../validations/descriptionSuite'
	import InputWrapper from '$lib/components/InputWrapper.svelte'
	import colorSuite from '$lib/features/token-management/color/colorSuite'

	export let token: IToken<'color'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement

		res = colorSuite(target.value, 'color')
	}

	let res = suite.get()

	const dispatch = createEventDispatcher()

	let hexInput: HTMLInputElement

	$: argb = Hct.from(token.value[0], token.value[1], token.value[2]).argb
	$: hex = Color(argb).hex()

	const handleHexChange = (e: Event) => {
		if (isAlias) return
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

<div class="flex flex-1 flex-row items-center gap-10">
	<div class="flex flex-row items-center gap-1">
		<div
			class="aspect-square h-7 rounded-sm border border-gray-400"
			style={`background-color: ${hex}`}
		/>
		<InputWrapper
			name="color"
			errors={res.getErrors('color')}
			isValid={res.isValid('color')}
		>
			<input
				value={hex}
				name="color"
				class="h-7 w-20 rounded-md bg-transparent px-2 py-1 text-sm text-gray-500"
				type="text"
				{...isAlias ? { disabled: true } : {}}
				on:focusout={handleHexChange}
				on:input={handleChange}
				bind:this={hexInput}
			/>
		</InputWrapper>
	</div>
	<div class="flex flex-1 flex-row items-center gap-6">
		<div class="flex w-full flex-col gap-1">
			<div class="flex flex-row items-center gap-1">
				<span class="text-xs text-gray-500">Hue</span>
				<input
					type="number"
					class="w-14 rounded-md border border-gray-100 px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={token.value[0]}
				/>
			</div>
			<Range
				min={0}
				max={360}
				id={`${token.id}-hue-range`}
				background={hueBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={token.value[0]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 0,
						value: e.detail.diff
					})}
			/>
		</div>
		<div class="flex w-full flex-col gap-1">
			<div class="flex flex-row items-center gap-1">
				<span class="text-xs text-gray-500">Chroma</span>
				<input
					type="number"
					class="w-14 rounded-md border border-gray-300 px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={token.value[1]}
				/>
			</div>
			<Range
				min={0}
				max={100}
				id={`${token.id}-chroma-range`}
				background={chromaBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={token.value[1]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 1,
						value: e.detail.diff
					})}
			/>
		</div>
		<div class="flex w-full flex-col gap-1">
			<div class="flex flex-row items-center gap-1">
				<span class="text-xs text-gray-500">Tone</span>
				<input
					type="number"
					class="w-14 rounded-md border border-gray-300 px-1 text-xs"
					{...isAlias ? { disabled: true } : {}}
					bind:value={token.value[2]}
				/>
			</div>
			<Range
				min={0}
				max={100}
				id={`${token.id}-saturation-range`}
				background={toneBackground}
				{...isAlias ? { disabled: true } : {}}
				bind:value={token.value[2]}
				on:change={(e) =>
					dispatch('colorChange', {
						valueChanged: 2,
						value: e.detail.diff
					})}
			/>
		</div>
	</div>
</div>
