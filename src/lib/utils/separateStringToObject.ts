function separateStringToObject(inputString: string) {
	const params = new URLSearchParams(inputString)
	const code = params.get('code')
	const state = params.get('state')

	return { code, state }
}

export default separateStringToObject
