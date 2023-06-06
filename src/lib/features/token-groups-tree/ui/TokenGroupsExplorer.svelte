<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'
	import tokenBaseMainStore from '$lib/features/token-groups-store/tokenbase-main-store'
	import DesignSystemExplorer from './atoms/DesignSystemExplorer.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		const addDefaultGroup = () => {
			designTokensGroupStore.addGroup('First System')
			const idFirstDefaultGroup =
				$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id
			tokenBaseMainStore.addDesignSystem(idFirstDefaultGroup, 'First System')
			$tokenBaseMainStore.activeDesignSystemRootId = idFirstDefaultGroup
			console.log($tokenBaseMainStore)
		}
		if ($tokenBaseMainStore.designSystems.length === 0) {
			addDefaultGroup()
		}
	})

	const handleAddNewGroup = () => {
		designTokensGroupStore.addGroup(
			'',
			undefined,
			$tokenBaseMainStore.activeDesignSystemRootId
		)

		goto(`/${$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id}`)
	}

	$: tree = createTree(
		$designTokensGroupStore,
		$tokenBaseMainStore.activeDesignSystemRootId
	)

	$: groupId = $page.params.groupId as string
</script>

<div
	class="flex flex-col justify-between border-r border-solid border-gray-300 bg-gray-50 px-8 py-7"
>
	<div class="flex flex-col gap-3">
		<h1 class="text-lg font-bold">Tokenbase</h1>
		<DesignSystemExplorer />
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
	</div>
	<div class="flex flex-col gap-3">
		<button class="bg-blue-300 px-6" on:click={handleAddNewGroup}>add</button>
		<a
			class="flex flex-row items-center justify-center gap-2 rounded-md bg-black px-4 py-1 text-white"
			href={`/${groupId}/export`}
		>
			<Icon icon="tabler:package-export" />
			Export
		</a>
	</div>
</div>
