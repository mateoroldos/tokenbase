<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog'
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
	import { ChevronLeft } from 'lucide-svelte'
	import Button from '$lib/components/ui/button/Button.svelte'

	export let groups: Group[]
	export let templateId: string
	export let themes: Theme[]

	const previewStore: PreviewStore = writable({
		activeGroupId: groups[0]?.id ?? ''
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

<div>
	<Dialog.Root portal="yes">
		<Dialog.Trigger class="h-full w-full">
			<slot />
		</Dialog.Trigger>
		<Dialog.Portal class="overflow-hidden">
			<Dialog.Content
				class="flex h-full min-w-[90vw] overflow-hidden p-0"
				showClose={false}
			>
				<div class="grid flex-1 grid-cols-[250px_1fr] overflow-hidden">
					<GroupsExplorer
						{groups}
						designSystemId={templateId}
						{previewStore}
						viewMode={true}
					/>
					<div class="flex flex-1 flex-col overflow-hidden">
						<TemplateModalHeader
							{activeGroupIndex}
							{designSystemOverview}
							{groupsStore}
							{previewStore}
						>
							<Dialog.Close class="static">
								<Button variant="ghost" size="xs">
									<ChevronLeft class="mr-1 h-4 w-4" />
									Back to Templates
								</Button>
							</Dialog.Close>
						</TemplateModalHeader>
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
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>
