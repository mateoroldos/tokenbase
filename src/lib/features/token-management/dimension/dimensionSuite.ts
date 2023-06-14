import { create, test, enforce, only } from 'vest'

const dimensionSuite = create((data = {}, currentField) => {
	only(currentField)

	// Dimension token validations
	test('dimension', 'Must be a number', () => {
		enforce(data).isNumber
	})

	test('dimension', 'Dimension is required', () => {
		enforce(data).isNotBlank()
	})
})

export default dimensionSuite
