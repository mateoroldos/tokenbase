import { getDefaultTokenValues } from '$lib/features/token-groups-store/defaultTokenValues'
import type { IToken } from '$lib/features/token-groups-store/types/token.interface'

export const deleteTokenAlias = (token: IToken, activeThemeId: string) => {
	token.value[activeThemeId] = getDefaultTokenValues(token.type)

	return token
}
