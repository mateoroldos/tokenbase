<script lang="ts">
	import type { IToken } from '$lib/features/token-groups-store/types/token-interface'
	import { createTagsInput, melt } from '@melt-ui/svelte'
	import { X } from 'lucide-svelte'

	export let token: IToken<'fontFamily'>

	let {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags: token.value,
		unique: true
	})

	$: if (token.alias !== undefined) {
		$tags = token.value.map((t, i) => ({ value: t, id: `${i}` }))
	} else {
		token.value = $tags.map((t) => t.value)
	}
</script>

<div class="flex flex-row gap-8">
	<div
		use:melt={$root}
		class="text-magnum-600 flex max-h-[2rem] w-full flex-row flex-wrap gap-3 overflow-auto rounded-md border-2 px-2 py-1"
	>
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="bg-magnum-200 text-magnum-900 data-[disabled]:bg-magnum-300 data-[selected]:bg-magnum-400 flex items-center overflow-hidden rounded-md [word-break:break-word] data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span
					class="flex items-center border-r border-white/10 bg-slate-100 px-1.5"
					>{t.value}</span
				>
				<button
					use:melt={$deleteTrigger(t)}
					class="enabled:hover:bg-magnum-300 flex h-full items-center bg-slate-100 px-1"
				>
					<X class="h-4 w-4 bg-slate-100" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
			/>
		{/each}
		<input
			use:melt={$input}
			type="text"
			placeholder="Enter fonts..."
			class="min-w-[4.5rem] shrink grow basis-0 border-0 bg-transparent text-black outline-none focus:!ring-0 data-[invalid]:text-red-500"
		/>
	</div>
</div>
