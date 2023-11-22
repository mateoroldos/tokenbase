<script lang="ts">
	import type { SelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import * as Table from '$lib/components/ui/table'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { GroupsStore } from '$lib/features/token-groups-store/groupsStore'
	import type { Readable } from 'svelte/store'

	export let activeGroupIndex: number
	export let selectedTokensStore: SelectedTokensStore | null = null
	export let groupsStore: GroupsStore | Readable<Group[]>
	export let viewMode = false

	$: selectedTokens =
		selectedTokensStore && $selectedTokensStore
			? $groupsStore[activeGroupIndex]?.tokens.every((tkn) =>
					$selectedTokensStore.includes(tkn.id)
			  ) && $groupsStore[activeGroupIndex]?.tokens.length > 0
			: null

	let activeGroup = $groupsStore[activeGroupIndex] as Group
</script>

<Table.Root>
	<Table.Header class="sticky top-0 z-30 bg-slate-50">
		<Table.Row class="shadow-[0_1px_0] shadow-slate-100">
			{#if selectedTokensStore}
				<Table.Head class="h-10">
					<div class="flex items-center">
						<input
							disabled={viewMode}
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
			{/if}
			<Table.Head class="h-10 text-xs">Type</Table.Head>
			<Table.Head class="h-10 text-xs">Name</Table.Head>
			<Table.Head class="h-10 text-xs">Tools</Table.Head>
			<Table.Head class="h-10 text-xs">Controls</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body class="overflow-y-auto border-b border-b-slate-100">
		<slot />
	</Table.Body>
</Table.Root>
