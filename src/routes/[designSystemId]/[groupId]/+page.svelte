<script lang="ts">
	import {
		moveToken,
		type createGroupsStore
	} from '$lib/features/token-groups-store/groups'
	import { navigating, page } from '$app/stores'

	import { getContext, setContext } from 'svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import GroupHeader from './_components/GroupHeader.svelte'
	import * as Table from '$lib/components/ui/table'
	import buildStyleDictonaryJson from '$lib/features/export-design-system/buildStyleDictonaryJson'
	import styleDictionaryToGroups from '$lib/features/import-style-dictionary/buildGroupsFromJson'
	import StartCardTemplate from '../_components/StartCards/StartCardTemplate.svelte'
	import StartFromTokenModal from '$lib/features/templates/StartFromTokenModal.svelte'
	import StartFromBasicTemplateModal from '$lib/features/templates/StartFromBasicTemplateModal.svelte'
	import { Button } from '$components/ui/button'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		createSelectedTokensStore()

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

	const groupStartCards = [
		{
			title: 'Start with a template',
			description:
				'Start from a template to get a head start on your design system.',
			linkText: 'Start with a template',
			component: StartFromBasicTemplateModal,
			image: '/images/start-from-scratch.png'
		},
		{
			title: 'Create your first token',
			description:
				'Create a standard token to get started on your design system.',
			linkText: 'Create a standard token',
			image: '/images/start-from-scratch.png',
			component: StartFromTokenModal
		}
	]

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

	$: allTokensSelected =
		$selectedTokensStore.length ===
			$designTokensGroupStore[groupIndex].tokens.length &&
		$selectedTokensStore.length > 0

	$: if ($navigating) {
		setTimeout(() => {
			selectedTokensStore.clearTokens()
		}, 1) // This is setTimeout is a workaround to make the clear tokens work.
		//If we did it at the same time as the $navigation it didn't work
	}
</script>

{#if $designTokensGroupStore[groupIndex]}
	<section class="flex flex-1 flex-col overflow-y-hidden">
		<GroupHeader />
		<Table.Root>
			<Table.Header class="sticky top-0 z-30 bg-gray-50">
				<Table.Row class="shadow-[0_1px_0] shadow-gray-100">
					<Table.Head class="h-10">
						<div class="flex items-center">
							<input
								type="checkbox"
								class="h-4 w-4"
								checked={allTokensSelected}
								on:change={() => {
									if (
										$selectedTokensStore.length ===
										$designTokensGroupStore[groupIndex].tokens.length
									) {
										selectedTokensStore.clearTokens()
									} else {
										selectedTokensStore.setTokens(
											$designTokensGroupStore[groupIndex].tokens
										)
									}
								}}
							/>
						</div>
					</Table.Head>
					<Table.Head class="h-10 text-xs">Type</Table.Head>
					<Table.Head class="h-10 text-xs">Name</Table.Head>
					<Table.Head class="h-10 text-xs">Tools</Table.Head>
					<Table.Head class="h-10 text-xs">Controls</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body class="border-b border-b-gray-200">
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
					<div class="mt-9 grid grid-cols-2 gap-6 px-5 py-4">
						{#each groupStartCards as { title, description, component, linkText, image }}
							<StartCardTemplate {title} {description} {image}>
								{#if component}
									<svelte:component this={component} />
								{/if}
							</StartCardTemplate>
						{/each}
					</div>
				{/if}
			</Table.Body>
		</Table.Root>
	</section>
{:else}
	<p>Group not found</p>
{/if}
