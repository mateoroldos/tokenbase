import { create, test, enforce, only } from 'vest'

const fontWeightSuite = create((data = {}, currentField) => {
	only(currentField)

	// FontWeight token validations
	test('fontWeight', 'FontWeight is required', () => {
		enforce(data).isNotEmpty()
	})

	test(
		'fontWeight',
		'Must be "light," "normal," "bold," or a number between 0 and 1000',
		() => {
			const isLightNormalBold = /^(light|normal|bold)$/i.test(data)
			const isNumberBetween0And1000 =
				/^[0-9]{1,4}$/.test(data) && Number(data) >= 0 && Number(data) <= 1000

			if (!isLightNormalBold && !isNumberBetween0And1000) {
				enforce(data).matches(/^$/)
			}
		}
	)
})

export default fontWeightSuite
