import type { TemplateTag } from './template-tag.type'
import type { TemplateType } from './template-type.type'

export interface Template {
	name: string
	description: string
	tags: TemplateTag[]
	type: TemplateType
}

export interface TemplateWithSlug extends Template {
	slug: string
}
