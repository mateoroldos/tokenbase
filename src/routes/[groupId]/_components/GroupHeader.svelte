<script lang="ts">
	import type { createTokensGroupStore } from '$lib/features/token-groups-store/tokensGroup'
	import { page } from '$app/stores'
	import { getContext, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import Icon from '@iconify/svelte'
	import mockTemplate from '$lib/features/import-style-dictionary/templates/mockTemplate.json'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import Button from '$lib/components/Button.svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	const handleAddNewTemplate = () => {
		importStyleDictionary(
			JSON.stringify(mockTemplate),
			$designTokensGroupStore[groupIndex]!.id
		)
		goto(`/${$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id}`)
	}

	const handleDeleteGroup = async () => {
		await goto('/')
		designTokensGroupStore.deleteGroup(groupId)
	}

	const findGroupType = () => {
		if ($designTokensGroupStore[groupIndex]!.tokens.length > 0) {
			const tokenTypesSet = new Set(
				$designTokensGroupStore[groupIndex]!.tokens.map((token) => token.type)
			)
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
		const tokenType: TokenType =
			$designTokensGroupStore[groupIndex]!.type !== undefined
				? $designTokensGroupStore[groupIndex]!.type!
				: $designTokensGroupStore[groupIndex]!.tokens[
						$designTokensGroupStore[groupIndex]!.tokens.length - 1
				  ] != undefined
				? $designTokensGroupStore[groupIndex]!.tokens[
						$designTokensGroupStore[groupIndex]!.tokens.length - 1
				  ]!.type
				: 'color'

		designTokensGroupStore.addToken(groupId, tokenType)
	}

	const handleUnselectNameInput = () => {
		if (
			$designTokensGroupStore[groupIndex]!.name === undefined ||
			$designTokensGroupStore[groupIndex]!.name === ''
		) {
			$designTokensGroupStore[groupIndex]!.name = 'Untitled'
		}
	}

	onMount(() => {
		$designTokensGroupStore[groupIndex]!.type = findGroupType()
	})

	$: if (
		$designTokensGroupStore[groupIndex]!.name === undefined ||
		$designTokensGroupStore[groupIndex]!.name === ''
	) {
		const input = document.getElementById('group-name') as HTMLInputElement
		input?.select()
	}
</script>

<div
	class="border-b-1 flex flex-row justify-between border-b border-solid px-8 py-3"
>
	<input
		type="text"
		placeholder="Untitled"
		id="group-name"
		class="bg-transparent px-1 text-xl font-medium"
		bind:value={$designTokensGroupStore[groupIndex].name}
		on:focusout={handleUnselectNameInput}
	/>
	<div class="flex flex-row gap-3">
		{#if $designTokensGroupStore[groupIndex].tokens.length == 0}
			<button
				class="rounded-md bg-blue-300 px-6"
				on:click={() => handleAddNewTemplate()}>Start From Template</button
			>
		{/if}

		<button on:click={handleDeleteGroup}>delete</button>
		<Button on:click={handleAddToken}>
			<Icon icon="tabler:plus" />
			New Token
		</Button>
	</div>
</div>
