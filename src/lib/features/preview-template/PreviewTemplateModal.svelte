<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
    import * as Table from '$lib/components/ui/table'
	import { createEventDispatcher, setContext } from 'svelte'
	import { getContext } from 'svelte'
	import type { createPreviewGroupsStore } from './previewGroups'
	import TemplateExplorerPreview from './TemplateExplorerPreview.svelte'
	import { groupId } from './groupId'
	import { createSelectedTokensStore } from './selectedTokenStore'
	import PreviewToken from './PreviewToken.svelte';
	import { onDestroy } from 'svelte'
	import Header from './Header.svelte'
	export let templateOverview: TemplateWithSlug

	let draggedTokenId: string | null = null
	let open: boolean

	const previewDesignTokensGroupStore: ReturnType<typeof createPreviewGroupsStore> =
		getContext('previewDesignTokensGroupStore')
	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		createSelectedTokensStore()
	const dispatch = createEventDispatcher()

	setContext('selectedTokensStore', selectedTokensStore)

	$: groupIndex = $previewDesignTokensGroupStore.findIndex(
		(group) => group.id === $groupId
	)
	
	onDestroy(()=>{
		// previewDesignTokensGroupStore.deleteGroup()
	})
    
	const closeModal = () => {
		open = false
		
		dispatch('load-template',templateOverview);
	}

</script>

<Dialog.Root bind:open portal="yes">
	<Dialog.Trigger class={buttonVariants({ size: 'sm' })} 
		>Preview</Dialog.Trigger
	>
	<Dialog.Portal>
		<Dialog.Content class="h-[85vh] min-w-[85vw] overflow-hidden p-0">
			<div class="grid h-screen grid-cols-[250px_1fr] overflow-hidden">
				<TemplateExplorerPreview />
				<section class="flex h-full flex-1 flex-col overflow-hidden">
					<Header {templateOverview} on:load-template={closeModal}/>
					{#if $previewDesignTokensGroupStore[groupIndex]}
					<Table.Root>
							<Table.Header class="sticky top-0 z-30 bg-slate-50">
								<Table.Row class="shadow-[0_1px_0] shadow-slate-100">
									<Table.Head class="h-10 text-xs">Type</Table.Head>
									<Table.Head class="h-10 text-xs">Name</Table.Head>
									<Table.Head class="h-10 text-xs">Tools</Table.Head>
									<Table.Head class="h-10 text-xs">Controls</Table.Head>
								</Table.Row>
							</Table.Header>
							{#if $previewDesignTokensGroupStore[groupIndex].tokens.length > 0}
								<Table.Body class="overflow-y-auto border-b border-b-slate-100">
									{#each $previewDesignTokensGroupStore[groupIndex].tokens as token, i (token.id)}
										<PreviewToken
											bind:token
											bind:draggedTokenId
										/>
									{/each}
								</Table.Body>
							{/if}
					</Table.Root>
					{:else}
						<!--Poner algo-->
					{/if}
				</section>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
