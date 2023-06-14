import { create, test, enforce, only } from 'vest'

const colorSuite = create((data = {}, currentField) => {
	only(currentField)

	//Color token validations
	test('color', 'Must be a valid hex value', () => {
		enforce(data).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
	})

	test('color', 'Color is required', () => {
		enforce(data).isNotEmpty
	})
})

export default colorSuite
