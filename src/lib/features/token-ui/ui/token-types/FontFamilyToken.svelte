<script lang="ts">
	import TagsInput from '$lib/components/TagsInput.svelte'
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import fontFamilySuite from '$lib/features/token-management/font-family/fontFamilySuite'
	import { createTagsInput, melt } from '@melt-ui/svelte'
	import { X } from 'lucide-svelte'

	export let token: IToken<'fontFamily'>

	$: isAlias = token.alias !== undefined

	const handleChange = (input: Event) => {
		if (isAlias) return
		const target = input.target as HTMLInputElement
		const name = target.name

		res = fontFamilySuite(target.value, name)
	}

	let res = fontFamilySuite.get()

	$: console.log(token.value)
</script>

<div class="flex flex-row gap-8">
	<TagsInput bind:tagsArray={token.value} />
</div>
