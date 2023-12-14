<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div class={cn('w-[min(90%,_70rem)] mx-auto', className)}>
	<slot />
</div>
