import { create, test, enforce, only } from 'vest'

const cubicBezierSuite = create((data = {}, currentField) => {
	only(currentField)

	//Cubic Bezier Validations
	test('p1x', 'Must be less than 1', () => {
		enforce(data).isBetween(0, 1.1)
		enforce(data).isNotBlank()
	})

	test('p2x', 'Must be less than 1', () => {
		enforce(data).isBetween(0, 1.1)
		enforce(data).isNotBlank()
	})

	test('p1y', 'Must be a number', () => {
		enforce(data).isNumber
		enforce(data).isNotBlank()
	})

	test('p2y', 'Must be a number', () => {
		enforce(data).isNumber
		enforce(data).isNotBlank()
	})
})

export default cubicBezierSuite
