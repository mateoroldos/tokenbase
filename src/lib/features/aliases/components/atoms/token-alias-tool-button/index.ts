import Root from './TokenToolAliasButton.svelte'
import { tv, type VariantProps } from 'tailwind-variants'

export const tokenToolAliasButtonVariants = tv({
	base: '',
	variants: {
		state: {
			disabled: 'text-slate-400',
			lookingForAlias:
				'border-purple-700 bg-purple-700 text-purple-50 hover:border-red-700 hover:bg-red-200 hover:text-red-700',
			receivingAlias:
				'border-purple-400 bg-purple-50 text-purple-400 hover:border-purple-700 hover:bg-purple-700 hover:text-purple-50'
		}
	},
	defaultVariants: {
		state: 'disabled'
	}
})

export type Variant = VariantProps<typeof tokenToolAliasButtonVariants>['state']

export {
	Root,
	//
	Root as Button
}
