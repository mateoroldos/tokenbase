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
	class="flex flex-col justify-between border-r border-solid bg-gray-200 px-8 py-7"
>
	<div class="flex flex-col gap-3">
		<h1 class="text-lg font-bold">Tokenbase</h1>
		<DesignSystemExplorer />
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
		<button
			class="align-center font-small flex flex-row items-center gap-1 border-t border-solid border-t-gray-300 pl-2 pt-1 text-sm text-gray-400 transition-colors hover:text-gray-500"
			on:click={handleAddNewGroup}
		>
			<Icon icon="tabler:plus" />
			Add group
		</button>
	</div>
	<div class="flex flex-col gap-3">
		<a
			class="flex flex-row items-center justify-center gap-2 rounded-md bg-black px-4 py-1 text-white"
			href={`/${groupId}/export`}
		>
			<Icon icon="tabler:package-export" />
			Export
		</a>
	</div>
</div>
