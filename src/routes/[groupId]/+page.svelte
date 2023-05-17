<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'
	import {
		moveToken,
		type DesignTokensStore
	} from '$lib/features/token-groups-store/tokensGroup'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import { defaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	)

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number
	$: group = $designTokensGroupStore[groupIndex] as Group

	let selectedTokens: string[] = []
	let draggedTokenId: string | null = null

	const handleDragStart = (tokenId: string) => {
		draggedTokenId = tokenId
	}

	const handleDeleteGroup = async () => {
		await goto('/')
		designTokensGroupStore.deleteGroup(groupId)
	}

	const handleDragEnter = (droppedTokenId: string) => {
		if (draggedTokenId != droppedTokenId) {
			const draggedTokenIndex = $designTokensGroupStore[
				groupIndex
			]?.tokens.findIndex((token) => token.id === draggedTokenId) as number

			const droppedTokenIndex = $designTokensGroupStore[
				groupIndex
			]?.tokens.findIndex((token) => token.id === droppedTokenId) as number

			group.tokens = moveToken(
				draggedTokenIndex,
				droppedTokenIndex,
				group.tokens
			)
		}
	}

	const handleSelectToken = (tokenId: string) => {
		selectedTokens = [...selectedTokens, tokenId]
	}

	const handleUnselectToken = (tokenId: string) => {
		selectedTokens = selectedTokens.filter((selectedToken) => {
			return selectedToken !== tokenId
		})
	}

	$: {
		group.tokens.forEach((token) => {
			if (token.type === group.type) {
				token.value = defaultTokenValues[token.type]
			}
		})
	}
</script>

<div>
	<div
		class="border-b-1 flex flex-row gap-20 border-b border-solid border-gray-300 bg-gray-100 px-8 py-3"
	>
		<h1 contenteditable="true" bind:textContent={group.name} />
		<select bind:value={group.type}>
			{#each tokenTypesArray as contentType}
				<option value={contentType}>
					{contentType}
				</option>
			{/each}
		</select>
		<button on:click={() => designTokensGroupStore.addToken(groupId, 'color')}
			>Add token</button
		>
		<button on:click={handleDeleteGroup}>delete</button>
	</div>
	{#each group.tokens as token}
		<Token
			selected={selectedTokens.includes(token.id)}
			bind:token
			bind:draggedTokenId
			on:select={(e) => handleSelectToken(e.detail)}
			on:unselect={(e) => handleUnselectToken(e.detail)}
			on:dragstart={() => handleDragStart(token.id)}
			on:dragenter={() => handleDragEnter(token.id)}
			on:dragend={() => (draggedTokenId = null)}
		/>
	{/each}
</div>
