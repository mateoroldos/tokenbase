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
					<a
						href="/password-reset"
						class="text-xs text-blue-600 hover:text-blue-800"
						>Forgot your password?</a
					>
				</Form.Item>
			</Form.Field>
		</Form.Fields>
		<Form.Message />
		<Form.Button submitting={config.form.submitting} variant="secondary"
			>Sign in</Form.Button
		>
	</Form.Container>
</Form.Root>
