import { writable } from 'svelte/store'
import type { IToken } from '../token-groups-store/types/token-interface'

export const createSelectedTokensStore = () => {
	const { subscribe, update, set } = writable<IToken[]>([])

	const addToken = (token: IToken): void => {
		update((tokens) => {
			tokens.push(token)

			return tokens
		})
	}

	const setTokens = (tokens: IToken[]): void => {
		set(tokens)
	}

	const removeToken = (tokenId: string): void => {
		update((tokens) => {
			const index = tokens.findIndex((t) => t.id === tokenId)

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

// const selectedTokensStore = createSelectedTokensStore()

// export default selectedTokensStore
