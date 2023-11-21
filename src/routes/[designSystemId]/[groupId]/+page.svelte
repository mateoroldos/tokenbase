<script lang="ts">
	import { navigating, page } from '$app/stores'
	import { getContext, setContext } from 'svelte'
	import Token from '$lib/features/token-ui/ui/Token.svelte'
	import { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
	import * as Table from '$lib/components/ui/table'
	import StartCardTemplate from '../_components/StartCards/StartCardTemplate.svelte'
	import StartFromTemplateCard from '$lib/features/templates/atoms/StartFromTemplateCard.svelte'
	import * as EmptyStatePage from '.././_components/EmptyStatePage'
	import StartFromJsonCard from '../_components/StartFromJsonCard/StartFromJsonCard.svelte'
	import { viewMode } from '$lib/features/viewMode/stores/viewMode'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import GroupHeader from './_components/group-header/GroupHeader.svelte'
	import { derived, type Readable } from 'svelte/store'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { activeThemeIndex } from '$lib/features/themes/stores/activeThemeIndexStore'

	const activeDesignSystemIndex: Readable<number> = getContext(
		'activeDesignSystemIndex'
	)

	const activeGroupIndex = derived(
		[groupsStore, page],
		([$groupsStore, $page]) => {
			return $groupsStore.findIndex(
				(group) => group.id === $page.params.groupId
			)
		}
	)

	$: activeTheme = $designSystemsOverviewsStore[$activeDesignSystemIndex]
		?.themes[$activeThemeIndex] as Theme

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		createSelectedTokensStore()

	setContext('activeGroupIndex', activeGroupIndex)
	setContext('activeDesignSystemIndex', activeDesignSystemIndex)
	setContext('selectedTokensStore', selectedTokensStore)

	// When the user changes a color hue, chroma or tone individually, we update by the same value all the selected color tokens
	const handleColorChange = (e: CustomEvent, token: IToken) => {
		if (
			$selectedTokensStore.length > 1 &&
			$selectedTokensStore.includes(token.id)
		) {
			const colorTokensToChange = $groupsStore[
				$activeGroupIndex
			]?.tokens.filter(
				(tkn) =>
					tkn.id !== token.id &&
					token.type === 'color' &&
					$selectedTokensStore.includes(tkn.id)
			)

			if (colorTokensToChange) {
				for (let index = 0; index < colorTokensToChange.length; index++) {
					;(colorTokensToChange[index] as IToken<'color'>).value[
						activeTheme.id
					][e.detail.valueChanged] =
						(colorTokensToChange[index] as IToken<'color'>).value[
							activeTheme.id
						][e.detail.valueChanged] + e.detail.value
				}
			}
		}
	}

	$: selectedTokens =
		$groupsStore[$activeGroupIndex]?.tokens.every((tkn) =>
			$selectedTokensStore.includes(tkn.id)
		) && $groupsStore[$activeGroupIndex]?.tokens.length > 0

	$: if ($navigating) {
		setTimeout(() => {
			selectedTokensStore.clearTokens()
		}, 1) // This is setTimeout is a workaround to make the clear tokens work.
		//If we did it at the same time as the $navigation it didn't work
	}

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as Token[]
	)

	let activeGroup = $groupsStore[$activeGroupIndex] as Group
</script>

{#if $groupsStore[$activeGroupIndex] != undefined && $designSystemsOverviewsStore[$activeDesignSystemIndex] != undefined}
	<section class="flex h-full flex-1 flex-col overflow-hidden">
		<GroupHeader />
		{#if $groupsStore[$activeGroupIndex].tokens.length > 0}
			<Table.Root>
				<Table.Header class="sticky top-0 z-30 bg-slate-50">
					<Table.Row class="shadow-[0_1px_0] shadow-slate-100">
						<Table.Head class="h-10">
							<div class="flex items-center">
								<input
									disabled={$viewMode}
									type="checkbox"
									class="h-4 w-4"
									bind:checked={selectedTokens}
									on:change={() => {
										if (selectedTokens) {
											selectedTokensStore.clearTokens()
										} else {
											selectedTokensStore.setTokens(
												activeGroup.tokens.map((tkn) => tkn.id)
											)
										}
									}}
								/>
							</div>
						</Table.Head>
						<Table.Head class="h-10 text-xs">Type</Table.Head>
						<Table.Head class="h-10 text-xs">Name</Table.Head>
						<Table.Head class="h-10 text-xs">Tools</Table.Head>
						<Table.Head class="h-10 text-xs">Controls</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body class="overflow-y-auto border-b border-b-slate-100">
					{#each $groupsStore[$activeGroupIndex].tokens as token, i (token.id)}
						<Token
							activeThemeId={activeTheme.id}
							bind:token
							on:colorChange={(e) => handleColorChange(e, token)}
						/>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<EmptyStatePage.Root>
				<EmptyStatePage.Section>
					<EmptyStatePage.Heading
						>Add Tokens to your group</EmptyStatePage.Heading
					>
					<EmptyStatePage.Description
						>You can add Tokens manualy or quickstart with a Template or JSON
						file.</EmptyStatePage.Description
					>
				</EmptyStatePage.Section>
				<EmptyStatePage.Section>
					<EmptyStatePage.SectionHeading
						>Quickstarts</EmptyStatePage.SectionHeading
					>
					<div class="grid grid-cols-[2fr_3fr] gap-6">
						<StartCardTemplate
							title="Explore templates"
							content="Start from the template that fits your needs"
						>
							<!-- <StartFromTemplateModal activeTemplateTypes={['group']} /> -->
						</StartCardTemplate>
						<StartFromJsonCard />
					</div>
				</EmptyStatePage.Section>
				<EmptyStatePage.Section>
					<EmptyStatePage.SectionHeading
						>Popular templates</EmptyStatePage.SectionHeading
					>
					<div class="grid grid-cols-3 gap-6 pb-8">
						{#await getDesignSystemTemplates}
							<span>Getting templates...</span>
						{:then templates}
							{#each templates as template}
								{#if template.type === 'group'}
									<StartFromTemplateCard templateOverview={template} />
								{/if}
							{/each}
						{/await}
					</div>
				</EmptyStatePage.Section>
			</EmptyStatePage.Root>
		{/if}
	</section>
{:else}
	<p>Group not found</p>
{/if}
