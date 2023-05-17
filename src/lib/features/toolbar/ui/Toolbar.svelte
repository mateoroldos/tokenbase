<script lang="ts">
	import { page } from '$app/stores'
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import Icon from '@iconify/svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { generateColorShades } from '../tools/color-shade-generator/GenerateShades'
	import type {
		IToken,
		TokenType,
		TokenValue
	} from '$lib/features/token-groups-store/types/token-interface'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokens: Writable<IToken[]> = getContext('selectedTokens')

	const handleGenerateShades = () => {
		if (validShade) {
			console.log('Generating color shades...')

			const colorShades = generateColorShades(
				$selectedTokens[0]?.value as TokenValue<'color'>,
				$selectedTokens[1]?.value as TokenValue<'color'>,
				10
			)

			const colorShadesTokens = colorShades.map((colorShade) => ({
				type: 'color' as TokenType,
				value: colorShade
			}))

			designTokensGroupStore.bulkAddTokens(
				$page.params.groupId as string,
				colorShadesTokens
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
		{#each $selectedTokens as a}
			{a}
		{/each}
	</button>
{/if}
