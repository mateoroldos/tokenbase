import type { TemplateType } from '$lib/features/templates/types/template-type.type'
import type { Writable } from 'svelte/store'

export type PreviewStore = Writable<{
	activeGroupId: string
	templateType: TemplateType
}>
