<script lang="ts">
	import {
		moveToken,
		type createGroupsStore
	} from '$lib/features/token-groups-store/groups'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import GroupHeader from './_components/GroupHeader.svelte'
	import buildStyleDictonaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	$: groupId = $page.params.groupId as string

	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	let draggedTokenId: string | null = null

	const handleDragStart = (tokenId: string) => {
		draggedTokenId = tokenId
	}

	const handleDragEnter = (droppedTokenId: string) => {
		if (draggedTokenId != droppedTokenId) {
			const draggedTokenIndex = $designTokensGroupStore[
				groupIndex
			]?.tokens.findIndex((token) => token.id === draggedTokenId) as number

			const droppedTokenIndex = $designTokensGroupStore[
				groupIndex
			]?.tokens.findIndex((token) => token.id === droppedTokenId) as number

			$designTokensGroupStore[groupIndex]!.tokens = moveToken(
				draggedTokenIndex,
				droppedTokenIndex,
				$designTokensGroupStore[groupIndex]!.tokens
			)
		}
	}

	// When the user changes a color hue, chroma or tone individually, we update by the same value all the selected color tokens
	const handleColorChange = (e: CustomEvent, token: IToken) => {
		if (
			$selectedTokensStore.length > 1 &&
			$selectedTokensStore.includes(token)
		) {
			const colorTokensToChange = $selectedTokensStore.filter(
				(tkn) => tkn.id !== token.id && token.type === 'color'
			)

			for (let index = 0; index < colorTokensToChange.length; index++) {
				;(colorTokensToChange[index] as IToken<'color'>).value[
					e.detail.valueChanged
				] =
					(colorTokensToChange[index] as IToken<'color'>).value[
						e.detail.valueChanged
					] + e.detail.value
			}
		}
	}

	// const findGroupType = () => {
	// 	if ($designTokensGroupStore[groupIndex]!.tokens.length > 0) {
	// 		const tokenTypesSet = new Set(
	// 			$designTokensGroupStore[groupIndex]!.tokens.map((token) => token.type)
	// 		)
	// 		const tokenTypesArray = [...tokenTypesSet]

	// 		if (tokenTypesArray.length === 1) {
	// 			return tokenTypesArray[0]
	// 		} else {
	// 			return undefined
	// 		}
	// 	} else {
	// 		return undefined
	// 	}
	// }

	// onMount(() => {
	// 	$designTokensGroupStore[groupIndex]!.type = findGroupType()
	// })
</script>

{#if $designTokensGroupStore[groupIndex]}
	<section class="flex flex-1 flex-col justify-between">
		<div>
			<GroupHeader />
			<div>
				{#if $designTokensGroupStore[groupIndex].tokens.length > 0}
					{#each $designTokensGroupStore[groupIndex].tokens as token (token.id)}
						<Token
							bind:token
							bind:draggedTokenId
							on:dragstart={() => handleDragStart(token.id)}
							on:dragenter={() => handleDragEnter(token.id)}
							on:dragend={() => (draggedTokenId = null)}
							on:colorChange={(e) => handleColorChange(e, token)}
						/>
					{/each}
				{:else}
					<p class="text-center text-gray-600">No tokens yet</p>
				{/if}
			</div>
			<div class="bottom-0 flex flex-row justify-center">
				<Toolbar />
			</div>
		</div>
	</section>
	<button
		on:click={() =>
			buildStyleDictonaryJson(
				$designTokensGroupStore,
				$page.params.designSystemId
			)}>Transform Test</button
	>
{:else}
	<p>Group not found</p>
{/if}
