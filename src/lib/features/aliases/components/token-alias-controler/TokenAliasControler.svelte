<script lang="ts">
	import type {
		AliasValue,
		IToken
	} from '$lib/features/token-groups-store/types/token.interface'
	import { Link2, Link2Off, Workflow } from 'lucide-svelte'
	import TokenAliasRoute from './atoms/TokenAliasRoute.svelte'
	import { deleteTokenAlias } from '../../functions/deleteTokenAlias'
	import { resolveIdsToAliasRouteAndIdsArray } from '../../utils/resolveIdsToAliasRoute'
	import { aliasMode } from '../../stores/aliasModeStore'
	import { getContext } from 'svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import { page } from '$app/stores'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import TokenToolAliasButton from './atoms/token-alias-tool-button/TokenToolAliasButton.svelte'
	import type { Readable } from 'svelte/store'

	export let token: IToken
	export let activeThemeId: string
	export let isAlias: boolean
	export let groupsStore: ReturnType<typeof createGroupsStore>

	const aliasDependencies: Readable<string[][]> = getContext(
		'activeThemeAliasDependenciesStore'
	)

	$: thisTokenDependencies = $aliasDependencies.filter((dependency) => {
		return dependency[1] === token.id
	})

	const handleTurnOnAliasMode = () => {
		if ($page.params.groupId) {
			$aliasMode = {
				groupId: $page.params.groupId,
				tokenId: token.id,
				tokenType: token.type
			}
		}
	}

	const handleTurnOffAliasMode = () => {
		$aliasMode = false
	}

	const handleCreateTokenAlias = () => {
		if ($aliasMode && $page.params.groupId) {
			groupsStore.createAlias(
				$aliasMode.groupId,
				$aliasMode.tokenId,
				$page.params.groupId,
				token.id,
				activeThemeId
			)

			$aliasMode = false
		}
	}

	const handleRemoveAlias = () => {
		let newToken = deleteTokenAlias(token, activeThemeId)

		token = newToken
	}

	$: aliasRouteAndIdArray = isAlias
		? resolveIdsToAliasRouteAndIdsArray(
				(token.value[activeThemeId] as AliasValue).groupId as string,
				(token.value[activeThemeId] as AliasValue).tokenId as string
		  )
		: []

	let hover = false
</script>

<div class="flex flex-row items-center gap-1">
	{#if $aliasMode && $aliasMode.tokenId === token.id}
		<TokenToolAliasButton
			on:click={handleTurnOffAliasMode}
			state="lookingForAlias"
		>
			<Link2 class="h-4 w-4 group-hover:hidden" />
			<Link2Off class="hidden h-4 w-4 group-hover:block" />
		</TokenToolAliasButton>
	{:else if $aliasMode && $aliasMode.tokenId !== token.id && $aliasMode.tokenType === token.type}
		<TokenToolAliasButton
			on:click={handleCreateTokenAlias}
			state="receivingAlias"
		>
			<Link2 class="h-4 w-4" />
		</TokenToolAliasButton>
	{/if}
	{#if isAlias && aliasRouteAndIdArray}
		<TokenAliasRoute {aliasRouteAndIdArray}>
			<button
				on:click={() => handleRemoveAlias()}
				class="group rounded-sm px-0 py-1 transition-colors"
			>
				<Link2Off class="hidden h-4 text-red-600 group-hover:flex" />
				<Link2 class="flex h-4 text-purple-600 group-hover:hidden" />
			</button>
		</TokenAliasRoute>
	{:else if !$aliasMode}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<TokenToolAliasButton on:click={handleTurnOnAliasMode}>
					<Link2 class="h-4 w-4" />
				</TokenToolAliasButton>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Create alias</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/if}
	{#if thisTokenDependencies.length > 0}
		<div
			class="flex h-7 flex-row items-center gap-1 rounded-md border border-purple-200 bg-purple-50 px-2 text-xs text-purple-600"
		>
			<Workflow class="h-4 w-4 text-purple-600" />
			<span>
				{thisTokenDependencies.length}
			</span>
			<span>
				{#if thisTokenDependencies.length === 1}
					Dependency
				{:else}
					Dependencies
				{/if}
			</span>
		</div>
	{/if}
</div>
