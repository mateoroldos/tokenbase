import { create, test, enforce, only } from 'vest'

const nameSuite = create((data = {}, currentField, tokenNames) => {
	only(currentField)

	test('name', 'Name should be unique', () => {
		enforce(data).condition((value) => ({
			pass: tokenNames.filter((t) => t === value).length < 2
		}))
	})
})

export default nameSuite
