<script lang="ts">
	import {
		moveToken,
		type createGroupsStore
	} from '$lib/features/token-groups-store/groups'
	import { navigating } from '$app/stores'
	import { page } from '$app/stores'
	import { getContext, onDestroy, onMount, setContext } from 'svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import GroupHeader from './_components/GroupHeader.svelte'
	import buildStyleDictonaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'
	import styleDictionaryToGroups from '$lib/features/import-style-dictionary/buildGroupsFromJson'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let selectedTokensStore: ReturnType<typeof createSelectedTokensStore> = createSelectedTokensStore();

	setContext('selectedTokensStore', selectedTokensStore)

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

	$: if ($navigating) {
		setTimeout(() => {
			selectedTokensStore.clearTokens()
		}, 1) // This is setTimeout is a workaround to make the clear tokens work. 
					//If we did it at the same time as the $navigation it didn't work
	}
</script>

{#if $designTokensGroupStore[groupIndex]}
	<section class="overflow-y-hidden flex flex-col flex-1">
		<GroupHeader />
		{#if $designTokensGroupStore[groupIndex].tokens.length > 0}
			<div class="overflow-y-auto">
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
			</div>
		{:else}
			<div>
				<p class="text-center text-gray-600">No tokens yet</p>
			</div>
		{/if}
	</section>
	<!-- <button
		on:click={() =>
			buildStyleDictonaryJson(
				$designTokensGroupStore,
				$page.params.designSystemId
			)}>Transform Test</button
	>
	<button
		on:click={() =>
			styleDictionaryToGroups(
				buildStyleDictonaryJson(
					$designTokensGroupStore,
					$page.params.designSystemId
				),
				$page.params.groupId
			)}>Transform Test 2</button
	> -->
{:else}
	<p>Group not found</p>
{/if}
