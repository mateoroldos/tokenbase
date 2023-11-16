import { writable } from 'svelte/store'

export const aliasMode = writable<
	| false
	| {
			groupId: string
			tokenId: string
			tokenType: string
	  }
>(false)
