import { create, test, enforce, only } from 'vest'

const jsonSuite = create((data = {}, currentField) => {
	only(currentField)

	//FontFamily token validations
	test('jsonFile', 'It is not a valid JSON', () => {
		enforce(data).startsWith('{')
	})
})

export default jsonSuite
