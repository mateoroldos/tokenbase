<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token.interface'
	import { Text } from 'lucide-svelte'
	import * as Dialog from '$lib/components/ui/dialog'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import { Textarea } from '$lib/components/ui/textarea'
	import TokenToolButton from '$lib/components/token-tool-button/TokenToolButton.svelte'

	export let token: IToken
	export let viewMode = false

	let showTokenDescription = false

	const toggleTokenDescriptionDialog = () => {
		showTokenDescription = !showTokenDescription
	}
</script>

{#if !viewMode || (token.description?.length != 0 && token.description != undefined)}
	<Dialog.Root>
		<Dialog.Trigger>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<TokenToolButton
						on:click={toggleTokenDescriptionDialog}
						state={token.description?.length === 0 || !token.description
							? 'disabled'
							: 'active'}
					>
						<Text class="h-4 w-4" />
					</TokenToolButton>
				</Tooltip.Trigger>
				{#if token.description?.length != 0 && token.description != undefined}
					<Tooltip.Content>
						<p>{token.description}</p>
					</Tooltip.Content>
				{:else if token.description == undefined}
					<Tooltip.Content>
						{#if viewMode}
							<p>See description</p>
						{:else}
							<p>Add a description</p>
						{/if}
					</Tooltip.Content>
				{/if}
			</Tooltip.Root>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Description>
					<div class="flex flex-col gap-2">
						<h3>Token description</h3>
						<Textarea bind:value={token.description} disabled={viewMode} />
					</div>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{/if}
