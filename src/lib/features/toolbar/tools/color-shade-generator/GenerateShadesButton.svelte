<script lang="ts">
	import { page } from '$app/stores'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import { SquareStack } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { generateShades } from './GenerateShades'
	import type {
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'
	import { Input } from '$lib/components/ui/input'
	import checkValidShade from './checkValidShade'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import ToolbarButton from '../../ui/atoms/ToolbarButton.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
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

<ToolbarButton
	icon={SquareStack}
	action={handleGenerateShades}
	name="Shade generator"
	active={validShade}
>
	{#if validShade}
		<Input
			name="amount-of-shades"
			type="number"
			bind:value={amountOfShades}
			class="h-full w-12 p-1 text-center"
			min="1"
		/>
	{/if}
</ToolbarButton>
