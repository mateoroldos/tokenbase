<script lang="ts">
	import {
		moveToken,
		type createGroupsStore
	} from '$lib/features/token-groups-store/groups'
	import { navigating } from '$app/stores'
	import { page } from '$app/stores'
	import { getContext, setContext } from 'svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import GroupHeader from './_components/GroupHeader.svelte'
	import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
  } from "$components/ui/table";
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

	$: allTokensSelected = ($selectedTokensStore.length === $designTokensGroupStore[groupIndex].tokens.length) && $selectedTokensStore.length > 0

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
		<Table>
			<TableHeader class="sticky top-0 bg-gray-50 z-30">
				<TableRow class="shadow-[0_1px_0] shadow-gray-100">
					<TableHead class="h-10">
						<div class="flex items-center">
							<input
							type="checkbox"
							class="h-4 w-4"
							checked={allTokensSelected}
							on:change={() => {
								if ($selectedTokensStore.length === $designTokensGroupStore[groupIndex].tokens.length) {
									selectedTokensStore.clearTokens()
								} else {
									selectedTokensStore.setTokens($designTokensGroupStore[groupIndex].tokens)
								}
							}}
						/>
					</div>
					</TableHead>
					<TableHead class="text-xs h-10">Type</TableHead>
					<TableHead class="text-xs h-10">Name</TableHead>
					<TableHead class="text-xs h-10">Tools</TableHead>
					<TableHead class="text-xs h-10">Controls</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody class="border-b-gray-200 border-b">
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
					<div>
						<p class="text-center text-gray-600">No tokens yet</p>
					</div>
				{/if}
			</TableBody>
		</Table>
	</section>
{:else}
	<p>Group not found</p>
{/if}
