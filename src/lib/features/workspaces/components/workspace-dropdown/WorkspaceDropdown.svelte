<script lang="ts">
	import { enhance } from '$app/forms'
	import { LogOut } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { Button } from '$lib/components/ui/button'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import type { Workspace } from '$lib/db/schema'

	export let workspaces: Workspace[]
	export let activeWorkspaceId: string
	export let userEmail: string

	$: activeWorkspace = workspaces.find(
		(w) => w.id === activeWorkspaceId
	) as Workspace
</script>

<div class="flex flex-row gap-1 items-center">
	<a href="/" class="mr-2">
		<img
			src="/LOGO_TOKENBASE.png"
			alt="Token-base logo"
			class="inline-block h-6 w-6"
		/>
	</a>
	<span class="text-xl text-slate-300 font-thin">|</span>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="ghost"
				class="px-2 py-1 h-fit text-md font-normal"
			>
				{activeWorkspace.name}
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Label class="font-normal text-slate-500"
				>{userEmail}</DropdownMenu.Label
			>
			<DropdownMenu.Separator />
			<DropdownMenu.Label class="font-normal text-slate-400"
				>Workspaces</DropdownMenu.Label
			>
			<DropdownMenu.Group>
				{#each workspaces as workspace}
					<DropdownMenu.Item on:m-click={() => goto(`/${workspace.id}`)}>
						{workspace.name}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<form action="/login?/logout" method="post" use:enhance>
				<button class="w-full">
					<DropdownMenu.Item>
						<LogOut class="w-3 h-3 mr-2" />
						Log out
					</DropdownMenu.Item>
				</button>
			</form>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
