<script lang="ts">
	import type { Label as LabelPrimitive } from 'bits-ui'
	import { getFormField } from 'formsnap'
	import { cn } from '$lib/utils'
	import { Label } from '$lib/components/ui/label'

	type $$Props = LabelPrimitive.Props

	let className: $$Props['class'] = undefined
	export { className as class }

	const { ids } = getFormField()
</script>

<Label for={$ids.input} class={cn('text-sm', className)} {...$$restProps}>
	<slot />
</Label>
