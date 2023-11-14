import type {
	TokenType,
	TokenValueWithNoAlias
} from '$lib/features/token-groups-store/types/token.interface'
import { checkIfValueIsColorToken } from '../color/utils/checkIfValueIsColor'
import { checkIfValueIsCubicBezier } from '../cubic-bezier/utils/checkIfValueIsCubicBezier'
import { checkIfValueIsDimensionToken } from '../dimension/utils/checkIfValueIsDimension'
import { checkIfValueIsDurationToken } from '../duration/utils/checkIfValueIsDuration'
import { checkIfValueIsFontFamilyToken } from '../font-family/utils/checkIfValueIsFontFamily'
import { checkIfValueIsFontWeightToken } from '../font-weight/utils/checkIfValueIsFontWeight'
import { checkIfValueIsNumberToken } from '../number/utils/checkIfValueIsNumber'

export const checkIfTokenTypeAndValueAreSynced = (
	tokenValue: TokenValueWithNoAlias,
	tokenType: TokenType
): boolean => {
	switch (tokenType) {
		case 'color':
			return checkIfValueIsColorToken(tokenValue)

		case 'dimension':
			return checkIfValueIsDimensionToken(tokenValue)

		case 'cubicBezier':
			return checkIfValueIsCubicBezier(tokenValue)

		case 'duration':
			return checkIfValueIsDurationToken(tokenValue)

		case 'fontFamily':
			return checkIfValueIsFontFamilyToken(tokenValue)

		case 'fontWeight':
			return checkIfValueIsFontWeightToken(tokenValue)

		case 'number':
			return checkIfValueIsNumberToken(tokenValue)
	}
}
