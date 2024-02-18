<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { formSchema, type FormSchema } from '../schema'
	import type { SuperValidated } from 'sveltekit-superforms'
	import designSystemsOverviewsStore from '$lib/features/token-groups-store/designSystemsOverviewsStore'
	import { goto } from '$app/navigation'

	export let form: SuperValidated<FormSchema>
	export let existingDesignSystemId: string | null
	export let activeWorkspaceId: string

	const options = {
		onResult: async (e) => {
			console.log(e.result.data)

			if (e.result.type === 'success') {
				designSystemsOverviewsStore.addDesignSystem(
					e.result.data.id,
					e.result.data.name
				)

				await goto(`/${activeWorkspaceId}/${e.result.data.id}`)
			}
		}
	}
</script>

{#if existingDesignSystemId === null}
	<Form.Root
		method="POST"
		action="?/addDesignSystem"
		{form}
		schema={formSchema}
		let:config
		{options}
	>
		<Form.Container>
			<Form.Fields>
				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Input type="text" required />
					</Form.Item>
				</Form.Field>
			</Form.Fields>
			<Form.Button submitting={config.form.submitting}
				>Create Design System</Form.Button
			>
		</Form.Container>
	</Form.Root>
{:else}
	<p>Design system already exists</p>
{/if}
