<script lang="ts">
	import designTokensGroupStore from '$lib/features/token-groups-store/tokensGroup'
	import GroupItem from './atoms/GroupItem.svelte'
	import createTree from '../functions/createTree'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import tokenBaseMainStore from '$lib/features/token-groups-store/tokenbaseMainStore'
	import { onMount } from 'svelte'
	import ExportSheet from '$components/ExportSheet.svelte'
	import Button from '$components/ui/button/Button.svelte'
	import { ArrowRightFromLine } from 'lucide-svelte'
	import { Plus } from 'lucide-svelte'

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

		goto(
			`/${$page.params.designSystemId}/${
				$designTokensGroupStore[$designTokensGroupStore.length - 1]!.id
			}`
		)
	}

	$: tree = createTree(
		$designTokensGroupStore,
		$tokenBaseMainStore.activeDesignSystemRootId
	)
</script>

<div
	class="flex flex-col justify-between border-r border-solid bg-gray-200 px-8 py-7"
>
	<div class="flex flex-col gap-3">
		<a href="/" class="text-lg font-bold">Tokenbase</a>
		<!-- <DesignSystemExplorer /> -->
		{#each tree.children as node}
			<GroupItem {node} />
		{/each}
		<button
			class="align-center font-small flex flex-row items-center gap-1 border-t border-solid border-t-gray-300 pl-2 pt-1 text-sm text-gray-400 transition-colors hover:text-gray-500"
			on:click={handleAddNewGroup}
		>
			<Plus class="h-3 w-3" />
			Add group
		</button>
	</div>
	<div class="flex flex-col gap-3">
		<ExportSheet />
	</div>
</div>
