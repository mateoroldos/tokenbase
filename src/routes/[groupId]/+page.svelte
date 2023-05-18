<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group-interface'
	import {
		moveToken,
		createTokensGroupStore
	} from '$lib/features/token-groups-store/tokensGroup'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { page } from '$app/stores'
	import { getContext, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import tokenTypesArray from '$lib/utils/tokenTypesArray'
	import { defaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === $page.params.groupId
	) as number
	$: group = $designTokensGroupStore[groupIndex] as Group

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

	// When the user changes a color hue, chroma or tone individually, we update by the same value all the selected color tokens
	const handleColorChange = (e: CustomEvent, token: IToken) => {
		if (
			$selectedTokensStore.length > 1 &&
			$selectedTokensStore.includes(token)
		) {
			const colorTokensToChange = $selectedTokensStore.filter(
				(tkn) => tkn !== token && token.type === 'color'
			)

			const selectedTokensFromGroupStore = colorTokensToChange.map(
				(tkn) =>
					$designTokensGroupStore[groupIndex]?.tokens.find(
						(token) => token.id === tkn.id
					) as IToken
			)

			for (
				let index = 0;
				index < selectedTokensFromGroupStore.length;
				index++
			) {
				;(selectedTokensFromGroupStore[index] as IToken<'color'>).value[
					e.detail.valueChanged
				] =
					(selectedTokensFromGroupStore[index] as IToken<'color'>).value[
						e.detail.valueChanged
					] + e.detail.value
			}
		}
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

			<button on:click={() => designTokensGroupStore.addToken(groupId, 'color')}
				>Add token</button
			>
			<button on:click={handleDeleteGroup}>delete</button>
		</div>
		<div>
			{#each group.tokens as token (token.id)}
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
		<div class="bottom-0 flex flex-row justify-center">
			<Toolbar />
		</div>
	</div>
</section>
