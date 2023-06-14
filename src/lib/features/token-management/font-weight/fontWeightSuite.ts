import { create, test, enforce, only } from 'vest'

const fontWeightSuite = create((data = {}, currentField) => {
	only(currentField)

	//FontWeight token validations
	test('fontWeight', 'Light, normal, bold admited', () => {
		enforce(data).matches('^(light|normal|bold)$')
	})

	test('fontWeight', 'FontWeight is required', () => {
		enforce(data).isNotEmpty()
	})
})

export default fontWeightSuite
