<script lang="ts">
	import { page } from '$app/stores';
	import type { GroupsTree } from '$lib/features/token-groups-explorer/types/groups-tree';
	import type { DesignTokensStore } from '$lib/stores/custom/tokensGroup';
	import { getContext } from 'svelte';

	const designTokensGroupStore: DesignTokensStore = getContext(
		'designTokensGroupStore'
	);
</script>

<div>Home</div>
