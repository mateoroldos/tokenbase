import type { StyleDictonaryToken } from './style-dictionary-token.interface'

export interface StyleDictonaryGroup {
	[key: string]: StyleDictonaryToken | StyleDictonaryGroup
}
