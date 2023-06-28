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
	import Input from '$components/ui/input/Input.svelte'
	import type { createDesignSystemsDataStore } from '$lib/features/token-groups-store/tokenbaseMainStore'
	import Header from '../../_components/Header.svelte'

	const designTokensGroupStore: ReturnType<typeof createTokensGroupStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsDataStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.designSystems.findIndex(
		(designSystem) =>
			designSystem.id === $tokenBaseMainStore.activeDesignSystemRootId
	)

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

<Header>
	<div class="flex flex-row gap-3">
		<Button on:click={handleAddToken}>
			<Icon icon="tabler:plus" />
			New Token
		</Button>
	</div>
</Header>
