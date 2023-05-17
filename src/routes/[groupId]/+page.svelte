<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'
	import {
		moveToken,
		type DesignTokensStore
	} from '$lib/features/token-groups-store/tokensGroup'
	import { page } from '$app/stores'
	import { getContext, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'

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
	const handleGroupType = () => {
		const tokenTypes = new Set(group.tokens.map((token) => token.type))
		const distinctTokenTypes = [...tokenTypes]
		if (distinctTokenTypes.length === 1) {
			group.type = distinctTokenTypes[0]
		} else {
			group.type =
				group.tokens.length > 0
					? distinctTokenTypes[distinctTokenTypes.length - 1]
					: undefined
		}
		console.log(group.type)
	}

	onMount(() => {
		handleGroupType()
	})
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
		<span>{group.type}</span>
		<button
			on:click={() =>
				designTokensGroupStore.addToken(groupId, 'osss', 'color', [0, 0, 0])}
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
