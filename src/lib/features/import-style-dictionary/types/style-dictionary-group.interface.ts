import type { StyleDictionaryToken } from './style-dictionary-token.interface'

export interface StyleDictionaryGroup {
	[key: string]: StyleDictionaryToken | StyleDictionaryGroup
}
