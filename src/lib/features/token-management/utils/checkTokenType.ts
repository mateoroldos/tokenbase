import { checkIfValueIsColorToken } from '$lib/features/token-management/color/utils/checkIfValueIsColor'
import { checkIfValueIsDimensionToken } from '$lib/features/token-management/dimension/utils/checkIfValueIsDimension'
import { checkIfValueIsFontFamilyToken } from '$lib/features/token-management/font-family/utils/checkIfValueIsFontFamily'
import { checkIfValueIsDurationToken } from '$lib/features/token-management/duration/utils/checkIfValueIsDuration'
import { checkIfValueIsNumberToken } from '$lib/features/token-management/number/utils/checkIfValueIsNumber'
import { checkIfValueIsFontWeightToken } from '$lib/features/token-management/font-weight/utils/checkIfValueIsFontWeight'
import { checkIfValueIsCubicBezierToken } from '$lib/features/token-management/cubic-bezier/utils/checkIfValueIsCubicBezier'
import type { TokenType } from '../../token-groups-store/types/token.interface'

const checkTokenType = (value: any, type: TokenType): boolean => {
	switch (type) {
		case 'color':
			return checkIfValueIsColorToken(value)
		case 'dimension':
			return checkIfValueIsDimensionToken(value)
		case 'fontFamily':
			return checkIfValueIsFontFamilyToken(value)
		case 'duration':
			return checkIfValueIsDurationToken(value)
		case 'number':
			return checkIfValueIsNumberToken(value)
		case 'fontWeight':
			return checkIfValueIsFontWeightToken(value)
		case 'cubicBezier':
			return checkIfValueIsCubicBezierToken(value)
		default:
			return false
	}
}

export default checkTokenType
