<script lang="ts">
	import { page } from '$app/stores'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import Icon from '@iconify/svelte'
	import { getContext } from 'svelte'
	import { generateColorShades } from './GenerateShades'
	import type {
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			console.log('Generating color shades...')

			const colorShades = generateColorShades(
				$selectedTokensStore[0]?.value as TokenValue<'color'>,
				$selectedTokensStore[1]?.value as TokenValue<'color'>,
				amountOfShades
			)

			const colorShadesTokens = colorShades.map((colorShade, i) => ({
				type: 'color' as TokenType,
				value: colorShade,
				name: `${$selectedTokensStore[0]?.name}-shade-${i}`
			}))

			const firstSelectedTokenIndex = $designTokensGroupStore.findIndex(
				(token) => token.name === $selectedTokensStore[0]?.name
			)

			const lastSelectedTokenIndex = $designTokensGroupStore.findIndex(
				(token) => token.name === $selectedTokensStore[1]?.name
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
		$selectedTokensStore.length === 2 &&
		$selectedTokensStore[0]?.type === 'color' &&
		$selectedTokensStore[1]?.type === 'color'
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
