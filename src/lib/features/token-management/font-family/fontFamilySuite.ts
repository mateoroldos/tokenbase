import { create, test, enforce, only } from 'vest'

const fontFamilySuite = create((data = {}, currentField) => {
	only(currentField)

	//FontFamily token validations
	test('fontFamilyToken', 'Font Family is required', () => {
		enforce(data).isNotBlank()
	})

	test('fontFamilyToken', 'Must be less than 20 characters', () => {
		enforce(data).shorterThan(20)
	})
})

export default fontFamilySuite
