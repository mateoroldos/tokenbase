import { create, test, enforce, only } from 'vest'

const suite = create((data = {}, currentField) => {
	only(currentField)

	test('fontWeight', 'Light, normal, bold admited', () => {
		enforce(data).matches('^(light|normal|bold)$')
	})

	test('fontWeight', 'FontWeight is required', () => {
		enforce(data).isNotBlank
	})

	test('numberToken', 'Number is required', () => {
		enforce(data).isNotBlank
	})

	test('numberToken', 'Must be a number', () => {
		enforce(data).isNumber
	})

	test('duration', 'Must be a number', () => {
		enforce(data).isNumber
	})

	test('dimension', 'Must be a number', () => {
		enforce(data).isNumber
	})
})

export default suite
