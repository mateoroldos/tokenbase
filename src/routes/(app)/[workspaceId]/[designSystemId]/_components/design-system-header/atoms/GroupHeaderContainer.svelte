<script lang="ts">
	import { aliasMode } from '$lib/features/aliases/stores/aliasModeStore'
</script>

<div
	class="border-b-1 flex min-h-[70px] flex-row items-center justify-between border-b border-solid border-b-slate-100 bg-white px-4 py-4 transition-colors"
	class:bg-purple-100={$aliasMode}
	class:border-b-purple-200={$aliasMode}
>
	<slot />
</div>
