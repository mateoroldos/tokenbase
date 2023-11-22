import type { Writable } from 'svelte/store'

export type PreviewStore = Writable<{
	activeGroupId: string
}>
