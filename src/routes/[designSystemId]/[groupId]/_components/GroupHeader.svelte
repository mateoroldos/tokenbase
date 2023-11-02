<script lang="ts">
	import { page } from '$app/stores'
	import { getContext, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { Plus } from 'lucide-svelte'
	import mockTemplate from '$lib/features/import-style-dictionary/templates/mockTemplate.json'
	import importStyleDictionary from '$lib/features/import-style-dictionary/importStyleDictionary'
	import { Button } from '$lib/components/ui/button'
	import Header from '../../_components/Header.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import type { createDesignSystemsOverviewsStore } from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<
		typeof createDesignSystemsOverviewsStore
	> = getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
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
</script>

<Header>
	<div class="flex flex-row gap-3">
		<Button on:click={handleAddToken}>
			<Plus class="w-3" />
			New Token
		</Button>
	</div>
</Header>
