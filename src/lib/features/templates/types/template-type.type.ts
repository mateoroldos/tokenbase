export const TEMPLATE_TYPES = ['groups', 'tokens'] as const

export type TemplateType = (typeof TEMPLATE_TYPES)[number]

export const TEMPLATE_TYPES_DETAILS: {
	[key in TemplateType]: {
		icon: string
		name: string
		description: string
	}
} = {
	groups: {
		icon: '📁',
		name: 'Group',
		description:
			'Collection of groups to import inside your groups or Design System.'
	},
	tokens: {
		icon: '🎨',
		name: 'Token',
		description: 'Collection of Tokens to import inside your groups.'
	}
}
