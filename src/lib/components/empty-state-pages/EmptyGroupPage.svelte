<script lang="ts">
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { Plus } from 'lucide-svelte'
	import StartFromTemplateCard from '../../../routes/(app)/[designSystemId]/_components/start-cards/StartFromTemplateCard.svelte'
	import Button from '../ui/button/Button.svelte'
	import * as EmptyStatePage from './'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import { getContext } from 'svelte'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Readable } from 'svelte/store'
	import type { TokenType } from '$lib/features/token-groups-store/types/token.interface'

	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let groupName: string

	const activeGroupIndex: Readable<number> = getContext('activeGroupIndex')
	$: activeGroup = $groupsStore[$activeGroupIndex] as Group

	const handleAddToken = () => {
		const tokenType: TokenType =
			activeGroup.type !== undefined
				? activeGroup.type
				: activeGroup.tokens[activeGroup.tokens.length - 1] != undefined
				  ? activeGroup.tokens[activeGroup.tokens.length - 1]!.type
				  : 'color'

		groupsStore.addToken(activeGroup.id, tokenType, activeDesignSystemThemes)
	}
</script>

<EmptyStatePage.Root>
	<EmptyStatePage.Section>
		<EmptyStatePage.Heading
			>{groupName}
			<span class="text-slate-300 font-normal"> group </span>
		</EmptyStatePage.Heading>
		<EmptyStatePage.Description
			>This group has no Tokens</EmptyStatePage.Description
		>
	</EmptyStatePage.Section>
	{#if !$viewMode}
		<EmptyStatePage.Section>
			<EmptyStatePage.SectionHeading
				>Add a token to this group</EmptyStatePage.SectionHeading
			>
			<Button on:click={handleAddToken} size="sm">
				<Plus class="mr-2 w-4" />
				Add Token
			</Button>
		</EmptyStatePage.Section>
		<EmptyStatePage.Section>
			<EmptyStatePage.SectionHeading
				>Or import an existing Group.</EmptyStatePage.SectionHeading
			>
			<StartFromTemplateCard
				{activeDesignSystemThemes}
				{groupIdToImportTemplate}
				title="Group of Tokens"
				description="Explore our curated list of Groups of Tokens."
				isDesignSystemRoot={false}
				activeTemplateType="tokens"
			/>
		</EmptyStatePage.Section>
	{/if}
</EmptyStatePage.Root>
