<script lang="ts">
	import type { TemplateWithSlug } from '$lib/features/templates/types/template-interface'
	import { preview } from '$lib/features/view-mode/stores/preview'
	import { onMount } from 'svelte'
	import { viewMode } from '$lib/features/view-mode/stores/viewMode'
	import EmptyDesignSystemPage from '$lib/components/empty-state-pages/EmptyDesignSystemPage.svelte'

	const getDesignSystemTemplates = fetch(`/api/templates`).then(
		async (data) => (await data.json()) as TemplateWithSlug[]
	)

	$: {
		if ($preview) {
			viewMode.set(true)
		} else {
			viewMode.set(false)
		}
	}

	onMount(() => {
		preview.set(false)
	})
</script>

<div class="h-full overflow-hidden">
	<EmptyDesignSystemPage />
</div>
