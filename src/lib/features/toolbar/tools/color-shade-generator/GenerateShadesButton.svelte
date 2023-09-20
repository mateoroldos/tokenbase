<script lang="ts">
	import { page } from '$app/stores'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import { SquareStack } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { generateShades } from './GenerateShades'
	import type {
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'
	import { Input } from '$lib/components/ui/input'
	import checkValidShade from './checkValidShade'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import ToolbarButton from '../../ui/atoms/ToolbarButton.svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	$: groupId = $page.params.groupId as string

	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			const firstToken = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.find((token) => token.id === $selectedTokensStore[0]) as IToken
			const secondToken = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.find((token) => token.id === $selectedTokensStore[1]) as IToken

			const tokenShades = generateShades(
				firstToken.value as TokenValue<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				secondToken.value as TokenValue<
					'color' | 'dimension' | 'number' | 'duration'
				>,
				amountOfShades
			)

			const shadeTokens = tokenShades
				.map((shade, i) => ({
					type: firstToken.type as TokenType,
					value: shade,
					name: `${firstToken.name}-shade-${i + 1}`
				}))
				.reverse()

			const firstTokenIndex = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[0])

			const secondTokenIndex = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[1])

			designTokensGroupStore.bulkAddTokens(
				$page.params.groupId as string,
				shadeTokens,
				firstTokenIndex > secondTokenIndex
					? firstTokenIndex - 1
					: secondTokenIndex
			)
		}
	}

	$: validShade =
		$selectedTokensStore.length === 2 &&
		checkValidShade(
			$designTokensGroupStore[groupIndex].tokens,
			$selectedTokensStore
		)
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
