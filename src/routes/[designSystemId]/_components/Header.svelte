<script lang="ts">
	import { activeThemeIndex } from './../../../lib/features/themes/activeThemeIndexStore.ts'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import DesignSystemBreadcrumb from './Breadcrumbs/DesignSystemBreadcrumb.svelte'
	import GroupBreadcrumb from './Breadcrumbs/GroupBreadcrumb.svelte'
	import { getContext } from 'svelte'
	import { Plus } from 'lucide-svelte'
	import Toolbar from '$lib/features/toolbar/ui/Toolbar.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { TokenType } from '$lib/features/token-groups-store/types/token-interface'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import Input from '$lib/components/ui/input/Input.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: groupId = $page.params.groupId as string
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

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

	let newThemeName: string = ''

	const handleAddTheme = () => {
		tokenBaseMainStore.addTheme(
			$page.params.designSystemId as string,
			newThemeName
		)

		designTokensGroupStore.addTheme($page.params.designSystemId as string)

		newThemeName = ''
	}

	$: activeGroupId = $page.params.groupId
</script>

<div
	class="border-b-1 flex flex-row items-center justify-between border-b border-solid border-b-slate-100 bg-white px-4 py-4"
>
	<div class="flex flex-row items-center gap-4">
		<DesignSystemBreadcrumb />
		{#if activeGroupId}
			<GroupBreadcrumb groupId={activeGroupId} />
		{/if}
	</div>
	{#if activeGroupId}
		<div class="flex flex-row items-center gap-7">
			<Toolbar />
			<Button on:click={handleAddToken} class="h-fit px-2 py-1 text-xs">
				<Plus class="mr-2 h-4 w-4" />
				Add Token
			</Button>
		</div>
	{/if}
	<div class="flex flex-row gap-7">
		<select
			name="active-theme"
			id="active-theme"
			bind:value={$activeThemeIndex}
		>
			{#each $tokenBaseMainStore[activeDesignSystemIndex]?.themes as theme, i}
				<option value={i}>
					{theme}
				</option>
			{/each}
			{activeThemeIndex}
		</select>
		<div class="flex flex-row gap-3">
			<Input
				bind:value={newThemeName}
				type="text"
				name="new-theme-name"
				id="new-theme-name"
			/>
			<Button on:click={handleAddTheme}>Add Theme</Button>
		</div>
	</div>
</div>
