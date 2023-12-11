import { writable } from 'svelte/store'

export const createSelectedTokensStore = () => {
	const { subscribe, update, set } = writable<string[]>([])

	const addToken = (tokenId: string): void => {
		update((tokens) => {
			tokens.push(tokenId)

			return tokens
		})
	}

	const setTokens = (tokensIds: string[]): void => {
		set(tokensIds)
	}

	const removeToken = (tokenId: string): void => {
		update((tokens) => {
			const index = tokens.findIndex((id) => id === tokenId)

			if (index !== -1) {
				tokens.splice(index, 1)
			}

			return tokens
		})
	}

	const clearTokens = (): void => {
		set([])
	}

	return {
		subscribe,
		set,
		addToken,
		setTokens,
		removeToken,
		clearTokens
	}
}

export type SelectedTokensStore = ReturnType<typeof createSelectedTokensStore>
