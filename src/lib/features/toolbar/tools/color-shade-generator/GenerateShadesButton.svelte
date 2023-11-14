<script lang="ts">
	import { page } from '$app/stores'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import { SquareStack } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { generateTokenShades } from './generateTokenShades'
	import type {
		IToken,
		TokenValue
	} from '$lib/features/token-groups-store/types/token.interface'
	import { Input } from '$lib/components/ui/input'
	import checkValidShade from './checkValidShade'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import ToolbarButton from '../../ui/atoms/ToolbarButton.svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')
	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: activeDesignSystemThemes =
		$tokenBaseMainStore[activeDesignSystemIndex]?.themes

	$: groupId = $page.params.groupId as string

	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			const firstToken = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.find((token) => token.id === $selectedTokensStore[0]) as IToken<
				'color' | 'dimension' | 'number' | 'duration'
			>
			const secondToken = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.find((token) => token.id === $selectedTokensStore[1]) as IToken<
				'color' | 'dimension' | 'number' | 'duration'
			>

			const tokenShades = generateTokenShades(
				firstToken,
				secondToken,
				activeDesignSystemThemes as Theme[],
				amountOfShades,
				$designTokensGroupStore
			)

			const firstTokenIndex = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[0])

			const secondTokenIndex = (
				$designTokensGroupStore[groupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[1])

			designTokensGroupStore.bulkAddTokens(
				$page.params.groupId as string,
				tokenShades,
				firstTokenIndex > secondTokenIndex
					? firstTokenIndex - 1
					: secondTokenIndex
			)
		}
	}

	$: validShade =
		$selectedTokensStore.length === 2 &&
		checkValidShade(
			$designTokensGroupStore[groupIndex]?.tokens as IToken[],
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
