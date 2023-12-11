<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { formSchema, type FormSchema } from './schema'
	import type { SuperValidated } from 'sveltekit-superforms'

	export let form: SuperValidated<FormSchema>
</script>

<Form.Root method="POST" {form} schema={formSchema} let:config>
	<Form.Container>
		<Form.Fields>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input type="email" required />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="password">
				<Form.Item>
					<Form.Label>Password</Form.Label>
					<Form.InputPassword />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="confirmPassword">
				<Form.Item>
					<Form.Label>Confirm password</Form.Label>
					<Form.InputPassword />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</Form.Fields>
		<Form.Message />
		<Form.Button submitting={config.form.submitting}>Sign up</Form.Button>
	</Form.Container>
</Form.Root>
