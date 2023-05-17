<script lang="ts">
	import { page } from '$app/stores'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import Icon from '@iconify/svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { generateColorShades } from './GenerateShades'
	import type {
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokens: Writable<IToken[]> = getContext('selectedTokens')

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			console.log('Generating color shades...')

			const colorShades = generateColorShades(
				$selectedTokens[0]?.value as TokenValue<'color'>,
				$selectedTokens[1]?.value as TokenValue<'color'>,
				amountOfShades
			)

			const colorShadesTokens = colorShades.map((colorShade, i) => ({
				type: 'color' as TokenType,
				value: colorShade,
				name: `${$selectedTokens[0]?.name}-shade-${i}`
			}))

			const firstSelectedTokenIndex = $designTokensGroupStore.findIndex(
				(token) => token.name === $selectedTokens[0]?.name
			)

			const lastSelectedTokenIndex = $designTokensGroupStore.findIndex(
				(token) => token.name === $selectedTokens[1]?.name
			)

			designTokensGroupStore.bulkAddTokens(
				$page.params.groupId as string,
				colorShadesTokens,
				firstSelectedTokenIndex > lastSelectedTokenIndex
					? lastSelectedTokenIndex - 1
					: firstSelectedTokenIndex
			)
		}
	}

	$: validShade =
		$selectedTokens.length === 2 &&
		$selectedTokens[0]?.type === 'color' &&
		$selectedTokens[1]?.type === 'color'
</script>

{#if validShade}
	<button
		class="flex flex-row items-center gap-2"
		on:click={handleGenerateShades}
	>
		<Icon icon="tabler:color-swatch" />
		Generate shades
	</button>
	<label for="amount-of-shades">Amount of shades</label>
	<input
		name="amount-of-shades"
		type="number"
		bind:value={amountOfShades}
		class="rounded border border-solid border-gray-400"
	/>
{/if}
