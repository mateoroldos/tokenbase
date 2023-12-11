<script lang="ts">
	import AuthFormCard from '$lib/features/auth/components/AuthFormCard.svelte'
	import { ArrowLeft } from 'lucide-svelte'
	import EmailForPasswordResetForm from './email-reset-password-form.svelte'

	export let data
</script>

<AuthFormCard title="Reset your password">
	<EmailForPasswordResetForm form={data.form} />
	<a
		href="/login"
		class="text-xs text-blue-600 hover:text-blue-800 flex flex-row items-center"
	>
		<ArrowLeft class="mr-1 h-3 w-3" />
		Back to login
	</a>
</AuthFormCard>
