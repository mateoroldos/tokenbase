<script lang="ts">
	import type {
		AliasValue,
		IToken
	} from '$lib/features/token-groups-store/types/token.interface'
	import { Link2 } from 'lucide-svelte'
	import { aliasMode } from '../../stores/aliasModeStore'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { Readable } from 'svelte/store'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import TurnOffAliasModeButton from './atoms/TurnOffAliasModeButton.svelte'
	import CreateAliasButton from './atoms/CreateAliasButton.svelte'
	import RemoveAliasButton from './atoms/RemoveAliasButton.svelte'
	import TurnOnAliasMode from './atoms/TurnOnAliasMode.svelte'
	import TokenDependenciesLabel from './atoms/TokenDependenciesLabel.svelte'
	import TokenAliasRouteLabel from './atoms/TokenAliasRouteLabel.svelte'
	import { resolveIdsToAliasRouteAndIdsArray } from '../../utils/resolveIdsToAliasRoute'
	import type { PreviewStore } from '$lib/features/preview-template-modal/types/preview-store.type'

	export let token: IToken
	export let activeThemeId: string
	export let isAlias: boolean
	export let groupsStore: GroupsStore | Readable<Group[]>
	export let aliasDependencies: string[][]
	export let viewMode: boolean
	export let activeGroupId: string
	export let previewStore: PreviewStore | null = null
	export let activeWorkspaceId: string

	$: tokenDependencies = aliasDependencies.filter((dependency) => {
		return dependency[1] === token.id
	})

	$: aliasRouteAndIdArray = isAlias
		? resolveIdsToAliasRouteAndIdsArray(
				(token.value[activeThemeId] as AliasValue).groupId as string,
				$groupsStore,
				(token.value[activeThemeId] as AliasValue).tokenId as string
		  )
		: []
</script>

<div class="flex flex-row items-center gap-1">
	{#if $aliasMode && $aliasMode.tokenId === token.id}
		<TurnOffAliasModeButton />
	{:else if $aliasMode && $aliasMode.tokenId !== token.id && $aliasMode.tokenType === token.type}
		<CreateAliasButton
			{groupsStore}
			{activeGroupId}
			tokenId={token.id}
			{activeThemeId}
			{activeWorkspaceId}
		/>
	{/if}
	{#if isAlias && aliasRouteAndIdArray}
		<TokenAliasRouteLabel
			{aliasRouteAndIdArray}
			{previewStore}
			{activeWorkspaceId}
		>
			{#if !viewMode}
				<RemoveAliasButton bind:token {activeThemeId} />
			{:else}
				<Link2 class="flex h-4 text-purple-600 group-hover:hidden" />
			{/if}
		</TokenAliasRouteLabel>
	{:else if !$aliasMode && !viewMode}
		<TurnOnAliasMode {activeGroupId} {token} />
	{/if}
	{#if tokenDependencies.length > 0}
		<TokenDependenciesLabel {tokenDependencies} />
	{/if}
</div>
