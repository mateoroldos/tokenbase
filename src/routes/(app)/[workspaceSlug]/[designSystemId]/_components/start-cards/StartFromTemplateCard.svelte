<script lang="ts">
	import StartFromTemplateModal from '$lib/features/templates/components/start-from-template-modal/StartFromTemplateModal.svelte'
	import type { Theme } from '$lib/features/token-groups-store/types/design-system-overview.interface'
	import StartCardTemplate from './atoms/QuickstartCard.svelte'

	export let activeDesignSystemThemes: Theme[]
	export let groupIdToImportTemplate: string
	export let title: string
	export let description: string
	export let isDesignSystemRoot: boolean
	export let activeTemplateType: 'groups' | 'tokens'
</script>

<StartFromTemplateModal
	{activeTemplateType}
	{activeDesignSystemThemes}
	{groupIdToImportTemplate}
	{isDesignSystemRoot}
>
	<StartCardTemplate {title} content={description}></StartCardTemplate>
</StartFromTemplateModal>
