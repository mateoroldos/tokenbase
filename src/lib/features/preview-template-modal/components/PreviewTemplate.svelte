<script lang="ts">
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import GroupsExplorer from '$lib/features/token-groups-tree/ui/GroupsExplorer.svelte'
	import { writable, readable } from 'svelte/store'
	import TokensTable from '$lib/components/tokens-table/TokensTable.svelte'
	import type {
		DesignSystemOverview,
		Theme
	} from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import type { PreviewStore } from '../types/preview-store.type'
	import { getAliasDependencies } from '$lib/features/aliases/utils/getAliasDependnecies'
	import TemplateModalHeader from './atoms/TemplateModalHeader.svelte'
	import TEMPLATE_DEFAULT_THEME from '$lib/features/templates/constants/TEMPLATE_DEFAULT_THEME'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import { createEventDispatcher } from 'svelte'

	export let groups: Group[]
	export let templateOverview: TemplateWithSlug
	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let isDesignSystemRoot: boolean

	const dispatch = createEventDispatcher()

	const themes = [TEMPLATE_DEFAULT_THEME]

	const previewStore: PreviewStore = writable({
		activeGroupId: groups[0]?.id ?? '',
		templateType: templateOverview.type
	})

	const groupsStore = readable(groups, (set) => {
		set(groups)
	})

	const theme = themes[0] as Theme

	const allTokens = $groupsStore.flatMap((group) => group.tokens)
	const aliasDependencies = getAliasDependencies(allTokens, theme)

	$: activeGroupIndex = groups.findIndex(
		(group) => group.id === $previewStore.activeGroupId
	) as number

	let designSystemOverview: DesignSystemOverview = {
		id: templateOverview.slug,
		name: templateOverview.name,
		themes: [TEMPLATE_DEFAULT_THEME]
	}

	let isOpen: boolean

	const handleTemplateImported = () => {
		isOpen = false
		dispatch('importedTemplate')
	}
</script>

<div class="grid flex-1 grid-cols-[250px_1fr] overflow-hidden">
	<GroupsExplorer
		{groups}
		designSystemId={templateOverview.slug}
		{previewStore}
		viewMode={true}
	>
		<slot />
	</GroupsExplorer>
	<div class="flex flex-1 flex-col overflow-hidden">
		<TemplateModalHeader
			{activeGroupIndex}
			{designSystemOverview}
			{groupsStore}
			{previewStore}
			{groupIdToImportTemplate}
			{activeDesignSystemThemes}
			{isDesignSystemRoot}
			on:importedTemplate={handleTemplateImported}
		/>
		{#if $groupsStore[activeGroupIndex].tokens.length > 0}
			<TokensTable {activeGroupIndex} {groupsStore} viewMode={true}>
				{#each $groupsStore[activeGroupIndex].tokens as token (token.id)}
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
		{:else}
			<div
				class="flex flex-col items-center justify-center h-full w-full border"
			>
				<p class="text-slate-400 text-lg">This group has no Tokens</p>
			</div>
		{/if}
	</div>
</div>
