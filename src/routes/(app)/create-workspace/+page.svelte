<script lang="ts">
	import CreateWorkspaceForm from '$lib/features/workspaces/components/create-workspace-form/create-workspace-form.svelte'

	export let data
</script>

<section class="container">
	<CreateWorkspaceForm form={data.form} />
</section>
