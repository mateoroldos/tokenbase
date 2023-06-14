import { create, test, enforce, only } from 'vest'

const numberSuite = create((data = {}, currentField) => {
	only(currentField)

	//Number token validations
	test('numberToken', 'Number is required', () => {
		enforce(data).isNotBlank()
	})

	test('numberToken', 'Must be a number', () => {
		enforce(data).isNumber
	})
})

export default numberSuite
