<script lang="ts">
	import { cn } from '$lib/utils'

	let className: string | undefined | null = undefined
	export { className as class }
</script>

<div class={cn('flex flex-col gap-1', className)}>
	<slot />
</div>
