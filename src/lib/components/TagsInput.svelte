<script lang="ts">
	import { createTagsInput, melt } from '@melt-ui/svelte'
	import { X } from 'lucide-svelte'

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		defaultTags: ['Arial'],
		unique: true
	})
	export let tagsArray = []

	$: tagsArray = $tags.map((tag) => tag.value)
</script>

<div class="flex flex-row gap-8">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col items-start justify-center gap-2">
			<div
				use:melt={$root}
				class="text-magnum-600 border-grey-200 flex max-w-[280px] flex-row flex-wrap gap-3 rounded-md border-2 border-solid px-2 py-1"
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
					class="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500"
				/>
			</div>
		</div>
	</div>
</div>
