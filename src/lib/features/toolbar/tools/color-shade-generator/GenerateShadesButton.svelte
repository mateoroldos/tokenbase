<script lang="ts">
	import { page } from '$app/stores'
	import type { SelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import { SquareStack } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import { generateTokenShades } from './generateTokenShades'
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
	import { Input } from '$lib/components/ui/input'
	import checkValidShade from './checkValidShade'
	import ToolbarButton from '../../ui/atoms/ToolbarButton.svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import type { Readable } from 'svelte/store'

	const selectedTokensStore: SelectedTokensStore = getContext(
		'selectedTokensStore'
	)

	$: activeDesignSystemIndex = $designSystemsOverviewsStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: activeDesignSystemThemes =
		$designSystemsOverviewsStore[activeDesignSystemIndex]?.themes

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')

	let amountOfShades = 10

	const handleGenerateShades = () => {
		if (validShade) {
			const firstToken = ($groupsStore[$activeGroupIndex] as Group).tokens.find(
				(token) => token.id === $selectedTokensStore[0]
			) as IToken<'color' | 'dimension' | 'number' | 'duration'>
			const secondToken = (
				$groupsStore[$activeGroupIndex] as Group
			).tokens.find((token) => token.id === $selectedTokensStore[1]) as IToken<
				'color' | 'dimension' | 'number' | 'duration'
			>

			const tokenShades = generateTokenShades(
				firstToken,
				secondToken,
				activeDesignSystemThemes as Theme[],
				amountOfShades,
				$groupsStore
			)

			const firstTokenIndex = (
				$groupsStore[$activeGroupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[0])

			const secondTokenIndex = (
				$groupsStore[$activeGroupIndex] as Group
			).tokens.findIndex((token) => token.id === $selectedTokensStore[1])

			groupsStore.bulkAddTokens(
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
			$groupsStore[$activeGroupIndex]?.tokens as IToken[],
			$selectedTokensStore
		)
</script>

{#if $activeGroupIndex != -1}
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
{/if}
