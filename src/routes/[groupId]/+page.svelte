<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'
	import {
		moveToken,
		type DesignTokensStore
	} from '$lib/features/token-groups-store/tokensGroup'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { page } from '$app/stores'
	import { getContext, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'

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

	const findGroupType = () => {
		console.log(group)

		if (group.tokens.length > 0) {
			const tokenTypesSet = new Set(group.tokens.map((token) => token.type))
			const tokenTypesArray = [...tokenTypesSet]

			if (tokenTypesArray.length === 1) {
				return tokenTypesArray[0]
			} else {
				return undefined
			}
		} else {
			return undefined
		}
	}

	const handleAddToken = () => {
		const tokenType =
			group.type != undefined
				? group.type
				: group.tokens[group.tokens.length - 1] != undefined
				? (group.tokens[group.tokens.length - 1] as IToken).type
				: 'color'

		designTokensGroupStore.addToken(groupId, 'osss', tokenType, [0, 0, 0])
	}

	onMount(() => {
		group.type = findGroupType()
	})

	$: group.tokens && (group.type = findGroupType())
</script>

<div>
	<div
		class="border-b-1 flex flex-row gap-20 border-b border-solid border-gray-300 bg-gray-100 px-8 py-3"
	>
		<h1 contenteditable="true" bind:textContent={group.name} />
		<button on:click={handleAddToken}>Add token</button>
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
