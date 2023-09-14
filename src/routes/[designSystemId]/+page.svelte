<script lang="ts">
	import Header from './_components/Header.svelte'
	import type { createDesignSystemsStore } from '$lib/features/token-groups-store/designSystemsIds'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'
	import StartCardTemplate from './_components/StartCards/StartCardTemplate.svelte'
	import StartFromTemplateModal from '$lib/features/templates/StartFromTemplateModal.svelte'
	import type { createGroupsStore } from '$lib/features/token-groups-store/groups'
	import StartFromJsonModal from '$lib/features/templates/StartFromJsonModal.svelte'

	const designTokensGroupStore: ReturnType<typeof createGroupsStore> =
		getContext('designTokensGroupStore')
	const tokenBaseMainStore: ReturnType<typeof createDesignSystemsStore> =
		getContext('tokenBaseMainStore')

	$: activeDesignSystemIndex = $tokenBaseMainStore.findIndex(
		(designSystem) => designSystem.id === $page.params.designSystemId
	)

	$: hasGroups = $designTokensGroupStore.find(
		(group) => group.parentGroup === $page.params.designSystemId
	)
</script>

<div>
	<Header />
	<section class="p-14">
		<StartCardTemplate
			title="Start from a template"
			description="Start from a template to get a head start on your design system."
			image="/images/start-from-template.png"
		>
			<StartFromTemplateModal activeTemplateTypes={['design-system']} />
		</StartCardTemplate>
	</section>
</div>
