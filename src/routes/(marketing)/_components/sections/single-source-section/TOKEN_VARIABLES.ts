export let TOKENS_VARIABLES: TokenVariable[] = [
	{
		text: '--color-brand-100',
		color: '#5585b5',
		description: 'color.brand.100'
	},
	{
		text: '--color-brand-200',
		color: '#53a8b6',
		description: 'color.brand.200'
	},
	{
		text: '--color-brand-300',
		color: '#79c2d0',
		description: 'color.brand.300'
	},
	{
		text: '--color-brand-400',
		color: '#bbe4e9',
		description: 'color.brand.400'
	}
]

export interface TokenVariable {
	text: string
	color: string
	description: string
}
