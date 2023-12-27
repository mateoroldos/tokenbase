<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { formSchemaClient, type FormSchemaClient } from './schema'
	import type { SuperValidated } from 'sveltekit-superforms'

	export let form: SuperValidated<FormSchemaClient>
</script>

<Form.Root method="POST" action="/" {form} schema={formSchemaClient} let:config>
	<Form.Container>
		<Form.Fields>
			<Form.Field {config} name="name">
				<Form.Item>
					<Form.Label>Workspace Name</Form.Label>
					<Form.Input type="text" required />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="id">
				<Form.Item>
					<Form.Label>Workspace URL</Form.Label>
					<Form.Input type="text" required />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Form.Fields>
		<Form.Message />
		<Form.Button submitting={config.form.submitting} variant="secondary"
			>Create Workspace</Form.Button
		>
	</Form.Container>
</Form.Root>
