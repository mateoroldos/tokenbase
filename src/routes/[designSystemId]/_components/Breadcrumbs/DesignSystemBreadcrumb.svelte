<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input'
	import { Search } from 'lucide-svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: groupId = $page.params.groupId
	$: groupIndex = $designTokensGroupStore.findIndex(
		(group) => group.id === groupId
	)

	const handleUnselectNameInput = () => {
		if (groupId) {
			if (
				$designTokensGroupStore[groupIndex]!.name === undefined ||
				$designTokensGroupStore[groupIndex]!.name === ''
			) {
				$designTokensGroupStore[groupIndex]!.name = 'Untitled'
			}
		}
	}

	const handleChangeDesignSystem = (e: Event) => {
		let designSystemId = (e.target?.dataset.value).replace(/"/g, '')
		goto(`/${designSystemId}`)
	}
	let filter = ''
</script>

<div class="flex flex-row items-center">
	<Select.Root>
		<Select.Trigger class="focus:ring-3 w-[180px] border-none">
			<Select.Value
				placeholder={$tokenBaseMainStore[activeDesignSystemIndex]?.name}
			/>
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<div class="flex flex-row">
					<Search
						class=" 
					 ml-3 mr-0 flex h-4 w-4  self-center "
						color="gray"
					/>
					<Input
						class="focus:ring-3 focus-visible:ring-3 border-none "
						value={filter}
						placeholder="Search system..."
						on:input={(e) => (filter = e.target.value)}
					/>
				</div>
				<Select.Separator />
				<Select.Label class="pl-6">Design Systems</Select.Label>
				{#each $tokenBaseMainStore as designSystem}
					{#if designSystem.name.toLowerCase().includes(filter.toLowerCase())}
						<Select.Item
							class="pl-6"
							on:m-click={(e) => {
								handleChangeDesignSystem(e)
							}}
							value={designSystem.id}
						>
							{designSystem.name}
						</Select.Item>
					{/if}
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteFruit" />
	</Select.Root>
</div>
