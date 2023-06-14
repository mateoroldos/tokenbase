import { create, test, enforce, only } from 'vest'

const durationSuite = create((data = {}, currentField) => {
	only(currentField)

	//Duration token validations
	test('duration', 'Must be a number', () => {
		enforce(data).isNumber
	})

	test('duration', 'Number is required', () => {
		enforce(data).isNotBlank()
	})
})

export default durationSuite
