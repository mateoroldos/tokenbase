<script lang="ts">
	import { Trash } from 'lucide-svelte'
	import ToolbarButton from '../../ui/atoms/ToolbarButton.svelte'
	import { getContext } from 'svelte'
	import type { createSelectedTokensStore } from '$lib/features/select-tokens/selectedTokensStore'
	import groupsStore from '$lib/features/token-groups-store/groupsStore'

	const selectedTokensStore: ReturnType<typeof createSelectedTokensStore> =
		getContext('selectedTokensStore')

	const handleDeleteTokens = () => {
		let tokensToDelete = [...$selectedTokensStore]

		for (let i = 0; i < tokensToDelete.length; i++) {
			const tokenId = tokensToDelete[i]

			if (tokenId) {
				groupsStore.deleteToken(tokenId)
			}
		}

		selectedTokensStore.clearTokens()
	}

	$: validDeleteToken = $selectedTokensStore.length > 0
</script>

<ToolbarButton
	icon={Trash}
	action={handleDeleteTokens}
	name="Delete tokens"
	active={validDeleteToken}
/>
