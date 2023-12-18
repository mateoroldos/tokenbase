<script lang="ts">
	import * as ShadcnAvatar from '$lib/components/ui/avatar'

	export let username: string
	export let image: string

	let firstTwoLetters = username.slice(0, 2).toUpperCase()
</script>

<div
	class="flex items-center justify-items-end gap-1 bg-slate-50 border border-slate-300 pr-2 pl-[3px] py-[3px] rounded-sm shadow-xs"
>
	<ShadcnAvatar.Root class="w-8 h-8 border">
		<ShadcnAvatar.Image src={image} alt={`@${username}`} />
		<ShadcnAvatar.Fallback>{firstTwoLetters}</ShadcnAvatar.Fallback>
	</ShadcnAvatar.Root>
	<p class="text-xs font-mono">{username.toUpperCase()}</p>
</div>
