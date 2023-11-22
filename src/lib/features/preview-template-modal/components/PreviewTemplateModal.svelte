<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import GroupsExplorer from '$lib/features/token-groups-tree/ui/GroupsExplorer.svelte'
	import { writable, readable, derived } from 'svelte/store'
	import TokensTable from '$lib/components/tokens-table/TokensTable.svelte'
	import type {
		DesignSystemOverview,
		Theme
	} from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import GroupHeaderBreadcrumbs from '$lib/components/breadcrumbs/groups-header-breadcrumbs/GroupHeaderBreadcrumbs.svelte'
	import type { PreviewStore } from '../types/preview-store.type'
	import { getAliasDependencies } from '$lib/features/aliases/utils/getAliasDependnecies'

	export let groups: Group[]
	export let templateId: string

	const previewStore: PreviewStore = writable({
		activeGroupId: groups[0].id
	})

	let theme: Theme = {
		id: '331164c4-7512-4b3e-8731-b3a9a2072c2e',
		name: 'Light'
	}

	const groupsStore = readable(groups, (set) => {
		set(groups)
	})

	const allTokens = $groupsStore.flatMap((group) => group.tokens)
	const aliasDependencies = getAliasDependencies(allTokens, theme)

	$: activeGroupIndex = groups.findIndex(
		(group) => group.id === $previewStore.activeGroupId
	) as number

	let designSystemOverview: DesignSystemOverview = {
		id: '331164c4-7512-4b3e-8731-b3a9a2072c2e',
		name: 'Light',
		themes: [
			{
				id: '331164c4-7512-4b3e-8731-b3a9a2072c2e',
				name: 'Light'
			}
		]
	}
</script>

<Dialog.Root portal="yes">
	<Dialog.Trigger class={buttonVariants({ size: 'sm' })}>Preview</Dialog.Trigger
	>
	<Dialog.Portal>
		<Dialog.Content class="h-[85vh] min-w-[85vw] overflow-hidden p-0">
			<div class="grid h-screen grid-cols-[250px_1fr] overflow-hidden">
				<!-- <TemplateExplorerPreview /> -->
				<GroupsExplorer
					{groups}
					designSystemId={templateId}
					{previewStore}
					viewMode={true}
				/>
				<div>
					<GroupHeaderBreadcrumbs
						{activeGroupIndex}
						activeDesignSystemOverview={designSystemOverview}
						activeDesignSystemIndex={0}
						viewMode={true}
						{groupsStore}
						{previewStore}
					/>
					<TokensTable {activeGroupIndex} {groupsStore} viewMode={true}>
						{#each $groupsStore[activeGroupIndex].tokens as token}
							<Token
								{token}
								activeThemeId={theme.id}
								{groupsStore}
								viewMode={true}
								{aliasDependencies}
								themes={designSystemOverview.themes}
								activeGroupId={$previewStore.activeGroupId}
								{previewStore}
							/>
						{/each}
					</TokensTable>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
