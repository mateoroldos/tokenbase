import { create, test, enforce, only } from 'vest'

const descriptionSuite = create((data = {}, currentField) => {
	only(currentField)

	//Description
	test('description', 'Description less than 20 characters', () => {
		enforce(data).shorterThan(20)
	})
})

export default descriptionSuite
