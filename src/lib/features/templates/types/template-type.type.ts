export const TEMPLATE_TYPES = ['design-system', 'group', 'token'] as const

export type TemplateType = (typeof TEMPLATE_TYPES)[number]

export const TEMPLATE_TYPES_DETAILS: {
	[key in TemplateType]: {
		icon: string
		name: string
		description: string
	}
} = {
	'design-system': {
		icon: '🎨',
		name: 'Design System',
		description:
			'A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.'
	},
	group: {
		icon: '📁',
		name: 'Group',
		description:
			'A group is a collection of templates that can be used together.'
	},
	token: {
		icon: '🔑',
		name: 'Token',
		description: 'A token is a single value that can be used in a template.'
	}
}
