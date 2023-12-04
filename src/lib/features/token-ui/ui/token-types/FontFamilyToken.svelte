<script lang="ts">
	import type { FontFamilyTokenValue } from '$lib/features/token-management/font-family/types/internal-font-family-value.type'
	import { createTagsInput, melt } from '@melt-ui/svelte'
	import { X } from 'lucide-svelte'

	export let tokenValue: FontFamilyTokenValue
	export let isAlias: boolean
	export let viewMode = false

	let {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags: tokenValue,
		unique: true
	})

	$: if (isAlias) {
		$tags = tokenValue.map((t, i) => ({ value: t, id: `${i}` }))
	} else {
		tokenValue = $tags.map((t) => t.value)
	}
</script>

<div class="flex flex-row gap-8">
	<div
		use:melt={$root}
		class="text-magnum-600 flex max-h-[2rem] w-full flex-row flex-wrap gap-3 overflow-auto rounded-md border px-2 py-1"
	>
		{#each $tags as t (t.id)}
			<div
				use:melt={$tag(t)}
				class="data-[selected]:bg-magnum-400 flex items-center overflow-hidden rounded-md bg-slate-100 text-slate-900 [word-break:break-word] data-[disabled]:bg-slate-300 data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span class="flex items-center border-r border-white/10 px-1.5"
					>{t.value}</span
				>
				{#if !viewMode}
					<button
						use:melt={$deleteTrigger(t)}
						class="enabled:hover:bg-magnum-300 flex h-full items-center px-1"
					>
						<X class="w-3" />
					</button>
				{/if}
			</div>
			<div
				use:melt={$edit(t)}
				class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
			/>
		{/each}
		{#if !viewMode}
			<input
				use:melt={$input}
				type="text"
				placeholder="Enter fonts..."
				class="min-w-[4.5rem] shrink grow basis-0 border-0 bg-transparent text-black outline-none focus:!ring-0 data-[invalid]:text-red-500"
			/>
		{/if}
	</div>
</div>
