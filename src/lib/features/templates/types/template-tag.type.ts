export const TEMPLATE_TAGS = [
	'community',
	'official',
	'colors',
	'typography',
	'material-ui',
	'tailwind'
] as const

export type TemplateTag = (typeof TEMPLATE_TAGS)[number]

export const TEMPLATE_TAGS_DETAILS: {
	[key in TemplateTag]: {
		icon: string
		name: string
		description: string
	}
} = {
	community: {
		icon: '👥',
		name: 'Community',
		description:
			'Community templates are created by the community, for the community.'
	},
	official: {
		icon: '🏢',
		name: 'Official',
		description: 'Official templates are created by the Tokenbase Labs team.'
	},
	colors: {
		icon: '🎨',
		name: 'Colors',
		description:
			'Colors templates are created to showcase different color palettes.'
	},
	typography: {
		icon: '🔤',
		name: 'Typography',
		description:
			'Typography templates are created to showcase different font pairings.'
	},
	'material-ui': {
		icon: '🧱',
		name: 'Material UI',
		description:
			'Material UI templates are created to showcase different Material UI themes.'
	},
	tailwind: {
		icon: '🦅',
		name: 'Tailwind',
		description:
			'Tailwind templates are created to showcase different Tailwind themes.'
	}
}
