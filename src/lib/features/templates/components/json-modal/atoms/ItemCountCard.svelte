<script lang="ts">
	import { fly } from 'svelte/transition'

	export let title: string
	export let number: number
</script>

<div
	class="border border-slate-200 rounded-md"
	in:fly|local={{ y: -10, duration: 100 }}
>
	<div class="bg-slate-100 px-3 py-1">
		<p class="text-sm font-medium text-slate-500">{title}</p>
	</div>
	<div class="px-3 py-1">
		<p class="text-sm font-medium text-slate-600">
			{number}
		</p>
	</div>
</div>
