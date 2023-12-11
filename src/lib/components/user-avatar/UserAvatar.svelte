<script lang="ts">
	import * as Avatar from '../ui/avatar'

	export let name: string
</script>

<div class="flex w-fit flex-row items-center gap-2">
	<Avatar.Root class="h-6 w-6">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<span class="text-xs font-medium text-slate-700">{name}</span>
</div>
