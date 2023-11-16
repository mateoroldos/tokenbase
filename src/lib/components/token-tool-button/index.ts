import Root from './TokenToolButton.svelte'
import { tv, type VariantProps } from 'tailwind-variants'

export const tokenToolButtonVariants = tv({
	base: 'group h-7 w-7 gap-2 border px-1 py-1 text-xs font-normal',
	variants: {
		state: {
			disabled: 'text-slate-400',
			active: 'border-slate-200 bg-slate-100 text-slate-700'
		}
	},
	defaultVariants: {
		state: 'disabled'
	}
})

export type Variant = VariantProps<typeof tokenToolButtonVariants>['state']

export {
	Root,
	//
	Root as Button
}
