<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import StartFromJsonModal from '$lib/features/templates/StartFromJsonModal.svelte'
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-md font-medium">Upload your JSON file</Card.Title>
	</Card.Header>
	<Card.Content class="flex-1">
		<p class="pb-2 text-sm">
			A JSON object is the simplest way of representing your Design System.
		</p>
		<p class="text-sm">
			Upload or paste your own Style Dictionary compatible JSON file to import
			your Design Tokens.
		</p>
	</Card.Content>
	<Card.Footer>
		<StartFromJsonModal />
	</Card.Footer>
</Card.Root>
