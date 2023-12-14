<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog'
	import type { Group } from '$lib/features/token-groups-store/types/group.interface'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import { ChevronLeft } from 'lucide-svelte'
	import Button from '$lib/components/ui/button/Button.svelte'
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import PreviewTemplate from './PreviewTemplate.svelte'

	export let groups: Group[]
	export let templateOverview: TemplateWithSlug
	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let isDesignSystemRoot: boolean

	let isOpen: boolean
</script>

<div>
	<Dialog.Root portal="yes" bind:open={isOpen}>
		<Dialog.Trigger class="h-full w-full">
			<slot />
		</Dialog.Trigger>
		<Dialog.Content
			class="flex h-full min-w-[90vw] overflow-hidden p-0"
			showClose={false}
		>
			<PreviewTemplate
				{groups}
				{templateOverview}
				{activeDesignSystemThemes}
				{groupIdToImportTemplate}
				{isDesignSystemRoot}
			>
				<Dialog.Close
					class="static flex items-center justify-center focus:ring-slate-300"
				>
					<Button variant="ghost" size="xs" class="gap-1">
						<ChevronLeft class="h-4 w-4" />
						All Templates
					</Button>
				</Dialog.Close>
			</PreviewTemplate>
		</Dialog.Content>
	</Dialog.Root>
</div>
