<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'
	import {
		moveToken,
		createTokensGroupStore
	} from '$lib/features/token-groups-store/tokensGroup'
	import { page } from '$app/stores'
	import { getContext, setContext } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import { writable, type Writable } from 'svelte/store'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number
	$: group = $designTokensGroupStore[groupIndex] as Group

	let selectedTokens: Writable<IToken[]> = writable([])
	setContext('selectedTokens', selectedTokens)

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

	const handleSelectToken = (token: IToken) => {
		$selectedTokens = [...$selectedTokens, token]
	}

	const handleUnselectToken = (token: IToken) => {
		$selectedTokens = $selectedTokens.filter((selectedToken) => {
			return selectedToken !== token
		})
	}
</script>

<section class="flex flex-1 flex-col justify-between">
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
			<button
				on:click={() =>
					designTokensGroupStore.addToken(groupId, 'osss', 'color', [0, 0, 0])}
				>Add token</button
			>
			<button on:click={handleDeleteGroup}>delete</button>
		</div>
		{#each group.tokens as token}
			<Token
				selected={$selectedTokens.includes(token)}
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
	<div class="bottom-0 flex flex-row justify-center">
		<Toolbar />
	</div>
</section>
