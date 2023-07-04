<script lang="ts">
	import { page } from '$app/stores'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import { SquareStack } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { generateShades } from './GenerateShades'
	import type {
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'
	import checkValidShade from './checkValidShade'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			const tokenShades = generateShades(
				$selectedTokensStore[0]?.value as TokenValue<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				$selectedTokensStore[1]?.value as TokenValue<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				amountOfShades
			)

			const shadeTokens = tokenShades.map((shade, i) => ({
				type: $selectedTokensStore[0]?.type as TokenType,
				value: shade,
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
				shadeTokens,
				firstSelectedTokenIndex > lastSelectedTokenIndex
					? lastSelectedTokenIndex - 1
					: firstSelectedTokenIndex
			)
		}
	}

	$: validShade = checkValidShade($selectedTokensStore)
</script>

{#if validShade}
	<button
		class="flex flex-row items-center gap-2"
		on:click={handleGenerateShades}
	>
		<SquareStack class="w-3" />
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
