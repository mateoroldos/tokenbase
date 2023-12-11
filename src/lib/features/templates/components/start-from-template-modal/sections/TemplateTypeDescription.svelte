<script lang="ts">
	import {
		TEMPLATE_TYPES_DETAILS,
		type TemplateType
	} from '$lib/features/templates/types/template-type.type'

	export let templateType: TemplateType
</script>

<div class="flex flex-col gap-1">
	<h3 class="text-2xl font-medium text-slate-800">
		{TEMPLATE_TYPES_DETAILS[templateType].name} Templates
	</h3>
	<p class="text-slate-500">
		{TEMPLATE_TYPES_DETAILS[templateType].description}
	</p>
</div>
