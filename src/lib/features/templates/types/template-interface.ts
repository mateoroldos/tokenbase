import type { TemplateTag } from './template-tag.type'
import type { TemplateType } from './template-type.type'

export interface Template {
	name: string
	description: string
	path: string
	tags: TemplateTag[]
	type: TemplateType
}
