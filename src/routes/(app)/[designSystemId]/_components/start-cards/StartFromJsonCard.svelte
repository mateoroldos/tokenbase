<script lang="ts">
	import StartFromJsonModal from '$lib/features/templates/components/json-modal/StartFromJsonModal.svelte'
	import StartCardTemplate from './atoms/QuickstartCard.svelte'
</script>

<StartFromJsonModal>
	<StartCardTemplate
		title="Style Dictionary JSON"
		content="Upload a Style Dictionary Compatible JSON."
	></StartCardTemplate>
</StartFromJsonModal>
