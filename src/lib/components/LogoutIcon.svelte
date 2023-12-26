<script lang="ts">
	import { LogOut } from 'lucide-svelte'
	import { enhance } from '$app/forms'
	import * as Tooltip from '$lib/components/ui/tooltip'
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<form action="/login?/logout" method="post" use:enhance>
			<button class="flex justify-center" type="submit">
				<LogOut
					class="h-4 w-4 text-slate-400 transition-colors hover:text-slate-900"
				/>
			</button>
		</form>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>Logout</p>
	</Tooltip.Content>
</Tooltip.Root>
