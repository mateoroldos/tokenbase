<script lang="ts">
    import { Button } from '$lib/components/ui/button'
	import { createEventDispatcher } from 'svelte'
	import type { TemplateWithSlug } from '../templates/types/template-interface'
	import { page } from '$app/stores'
	import importStyleDictionary from '../import-style-dictionary/importStyleDictionary'
	import { preview } from '../viewMode/stores/preview'
	import { viewMode } from '../viewMode/stores/viewMode'

	export let templateOverview: TemplateWithSlug

    const dispatch = createEventDispatcher()

    const handleCreateGroupFromTemplate = async () => {
        const templateFile = (
            await fetch(`/api/templates/${templateOverview.slug}`).then((res) =>
                res.json()
            )
        ).template as string

        let parentId: string

        if (templateOverview.type === 'group') {
            parentId = $page.params.groupId ?? ($page.params.designSystemId as string)
        } else {
            parentId = $page.params.designSystemId as string
        }

        importStyleDictionary(JSON.stringify(templateFile), parentId)
        preview.set(false);
        viewMode.set(false);
        dispatch('load-template', templateOverview)
    }
</script>

<div class="flex items-center justify-end pr-12 py-2"> 
    <Button on:click={handleCreateGroupFromTemplate}>Import Template</Button>
</div>