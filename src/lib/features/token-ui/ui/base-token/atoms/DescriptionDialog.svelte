<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { Text } from 'lucide-svelte'
	import { getContext } from 'svelte'
	import * as Dialog from '$lib/components/ui/dialog'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import Textarea from '$lib/components/ui/textarea/textarea.svelte'

	export let token: IToken

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')

	let showTokenList = false

	const toggleTokenList = () => {
		showTokenList = !showTokenList
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<button
					on:click={toggleTokenList}
					class:text-gray-300={token.description?.length === 0 ||
						!token.description}
				>
					<Text class="h-4 w-4" />
				</button>
			</Tooltip.Trigger>
			{#if token.description?.length != 0 && token.description != undefined}
				<Tooltip.Content>
					<p>{token.description}</p>
				</Tooltip.Content>
			{:else if token.description == undefined}
				<Tooltip.Content>
					<p>Add a description</p>
				</Tooltip.Content>
			{/if}
		</Tooltip.Root>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Description>
				<div class="flex flex-col gap-2">
					<h3>Token description</h3>
					<Textarea bind:value={token.description} />
				</div>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
